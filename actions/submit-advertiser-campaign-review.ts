import { defineAction, fail } from "@agent-native/core/action";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import { requireAdvertiserProfile, requireUserEmail } from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Submit an advertiser-owned campaign and its commission offer for Admin review.",
  schema: z.object({ id: z.string().uuid() }),
  run: async ({ id }, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();
    const [campaign] = await db
      .select({ status: schema.advertiserCampaigns.status })
      .from(schema.advertiserCampaigns)
      .where(and(eq(schema.advertiserCampaigns.id, id), eq(schema.advertiserCampaigns.ownerEmail, ownerEmail)))
      .limit(1);
    if (!campaign) {
      fail("Campaign tidak ditemukan.", { statusCode: 404, errorCode: "campaign_not_found" });
    }
    if (campaign.status !== "Draft" && campaign.status !== "Rejected") {
      fail("Campaign belum dapat diajukan untuk review.", { statusCode: 409, errorCode: "campaign_not_submittable" });
    }

    const [offer] = await db
      .select({ id: schema.offers.id, status: schema.offers.status, productId: schema.offers.productId, payoutIdr: schema.offers.payoutIdr })
      .from(schema.offers)
      .where(and(eq(schema.offers.campaignId, id), eq(schema.offers.advertiserEmail, ownerEmail)))
      .limit(1);
    if (!offer || (offer.status !== "Draft" && offer.status !== "Rejected") || !offer.productId || Number(offer.payoutIdr) < 1) {
      fail("Offer campaign dan payout yang valid wajib tersedia.", { statusCode: 409, errorCode: "campaign_offer_required" });
    }
    const [product] = await db
      .select({ status: schema.products.status, advertiserEmail: schema.products.advertiserEmail, websiteUrl: schema.products.websiteUrl })
      .from(schema.products)
      .where(eq(schema.products.id, offer.productId))
      .limit(1);
    if (!product || product.advertiserEmail !== ownerEmail || product.status !== "Active" || !product.websiteUrl) {
      fail("Produk harus aktif dan memiliki website tujuan sebelum campaign diajukan.", { statusCode: 409, errorCode: "campaign_product_not_active" });
    }

    const now = mysqlNow();
    await db.transaction(async (tx) => {
      await tx
        .update(schema.advertiserCampaigns)
        .set({ status: "Pending Review", updatedAt: now })
        .where(and(eq(schema.advertiserCampaigns.id, id), eq(schema.advertiserCampaigns.ownerEmail, ownerEmail), inArray(schema.advertiserCampaigns.status, ["Draft", "Rejected"])));
      await tx
        .update(schema.offers)
        .set({ status: "Pending Review", updatedAt: now })
        .where(and(eq(schema.offers.id, offer.id), inArray(schema.offers.status, ["Draft", "Rejected"])));
    });

    const [submitted] = await db
      .select({ status: schema.advertiserCampaigns.status })
      .from(schema.advertiserCampaigns)
      .where(and(eq(schema.advertiserCampaigns.id, id), eq(schema.advertiserCampaigns.ownerEmail, ownerEmail)))
      .limit(1);
    if (submitted?.status !== "Pending Review") {
      fail("Campaign tidak berhasil diajukan.", { statusCode: 409, errorCode: "campaign_review_conflict" });
    }
    return { id, status: submitted.status };
  },
});
