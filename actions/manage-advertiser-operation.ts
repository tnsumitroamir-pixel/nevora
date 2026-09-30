import { defineAction, fail } from "@agent-native/core/action";
import { and, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import { getActiveAdmin } from "../server/lib/admin-access.js";

const inputSchema = z.discriminatedUnion("recordType", [
  z.object({ recordType: z.literal("advertiser"), id: z.string().email(), status: z.enum(["active", "suspended"]) }),
  z.object({ recordType: z.literal("campaign"), id: z.string().uuid(), status: z.enum(["Active", "Rejected"]) }),
]);

export default defineAction({
  description: "Manage advertiser access and campaign reviews as Admin Root, with an audit event.",
  schema: inputSchema,
  run: async (input, ctx) => {
    const admin = await getActiveAdmin(ctx?.userEmail);
    if (!admin) {
      fail("Akses Admin Root diperlukan.", {
        statusCode: 403,
        errorCode: "admin_access_required",
      });
    }

    const db = await getDb();
    const now = mysqlNow();
    let previousStatus = "";
    const id = input.id.toLowerCase();

    await db.transaction(async (tx) => {
      if (input.recordType === "advertiser") {
        await tx.execute(sql`SELECT owner_email FROM advertiser_profiles WHERE owner_email = ${id} FOR UPDATE`);
        const [profile] = await tx
          .select({ email: schema.advertiserProfiles.ownerEmail, status: schema.users.status })
          .from(schema.advertiserProfiles)
          .leftJoin(schema.users, eq(schema.users.email, schema.advertiserProfiles.ownerEmail))
          .where(eq(schema.advertiserProfiles.ownerEmail, id))
          .limit(1);
        previousStatus = profile?.status ?? "";
        if (!profile || !["active", "suspended"].includes(previousStatus) || previousStatus === input.status) {
          fail("Status advertiser tidak dapat diubah dari keadaan ini.", {
            statusCode: 409,
            errorCode: "advertiser_status_conflict",
          });
        }
        await tx
          .update(schema.users)
          .set({ status: input.status, updatedAt: now })
          .where(and(eq(schema.users.email, id), eq(schema.users.status, previousStatus)));
        const moderatedStatus = input.status === "suspended" ? "Suspended" : "Rejected";
        await tx
          .update(schema.advertiserCampaigns)
          .set({ status: moderatedStatus, updatedAt: now })
          .where(and(eq(schema.advertiserCampaigns.ownerEmail, id), inArray(schema.advertiserCampaigns.status, input.status === "suspended" ? ["Active", "Pending Review"] : ["Suspended"])));
        await tx
          .update(schema.offers)
          .set({ status: moderatedStatus, updatedAt: now })
          .where(and(eq(schema.offers.advertiserEmail, id), inArray(schema.offers.status, input.status === "suspended" ? ["Active", "Pending Review"] : ["Suspended"])));
      } else {
        await tx.execute(sql`SELECT id FROM advertiser_campaigns WHERE id = ${input.id} FOR UPDATE`);
        const [campaign] = await tx
          .select({ status: schema.advertiserCampaigns.status, ownerEmail: schema.advertiserCampaigns.ownerEmail })
          .from(schema.advertiserCampaigns)
          .where(eq(schema.advertiserCampaigns.id, input.id))
          .limit(1);
        previousStatus = campaign?.status ?? "";
        const [advertiser] = campaign
          ? await tx
              .select({ status: schema.users.status })
              .from(schema.users)
              .where(eq(schema.users.email, campaign.ownerEmail))
              .limit(1)
          : [];
        if (!campaign || advertiser?.status !== "active" || previousStatus !== "Pending Review") {
          fail("Campaign tidak menunggu review.", {
            statusCode: 409,
            errorCode: "campaign_review_conflict",
          });
        }

        const [offer] = await tx
          .select({ id: schema.offers.id, productId: schema.offers.productId, status: schema.offers.status, payoutIdr: schema.offers.payoutIdr })
          .from(schema.offers)
          .where(eq(schema.offers.campaignId, input.id))
          .limit(1);
        if (!offer || offer.status !== "Pending Review") {
          fail("Offer campaign tidak siap untuk ditinjau.", {
            statusCode: 409,
            errorCode: "campaign_offer_review_conflict",
          });
        }
        if (input.status === "Active") {
          const [product] = await tx
            .select({ id: schema.products.id, status: schema.products.status, websiteUrl: schema.products.websiteUrl, category: schema.products.category, advertiserEmail: schema.products.advertiserEmail })
            .from(schema.products)
            .where(eq(schema.products.id, offer.productId ?? ""))
            .limit(1);
          if (!product || product.advertiserEmail !== campaign.ownerEmail || product.status !== "Active" || !product.websiteUrl || !product.category || Number(offer.payoutIdr) < 1) {
            fail("Produk aktif, tujuan, dan payout valid wajib tersedia sebelum campaign diaktifkan.", {
              statusCode: 409,
              errorCode: "campaign_supply_incomplete",
            });
          }
        }

        await tx
          .update(schema.advertiserCampaigns)
          .set({ status: input.status, updatedAt: now })
          .where(and(eq(schema.advertiserCampaigns.id, input.id), eq(schema.advertiserCampaigns.status, previousStatus)));
        await tx
          .update(schema.offers)
          .set({ status: input.status, updatedAt: now })
          .where(and(eq(schema.offers.campaignId, input.id), eq(schema.offers.status, "Pending Review")));
      }

      await tx.insert(schema.adminAuditLogs).values({
        id: crypto.randomUUID(),
        adminEmail: admin.email,
        action: `${input.recordType}_${input.status.toLowerCase()}`,
        targetType: input.recordType,
        targetId: input.id,
        details: JSON.stringify({ previousStatus, status: input.status }),
        createdAt: now,
      });
    });

    return { recordType: input.recordType, id: input.id, status: input.status };
  },
});
