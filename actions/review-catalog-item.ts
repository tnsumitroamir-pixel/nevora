import { and, eq } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import { getActiveAdmin } from "../server/lib/admin-access.js";

export default defineAction({
  description: "Approve or reject a product or offer awaiting review.",
  schema: z.object({
    itemType: z.enum(["product", "offer"]),
    itemId: z.string().uuid(),
    decision: z.enum(["approve", "reject"]),
  }),
  run: async ({ itemType, itemId, decision }, ctx) => {
    const admin = await getActiveAdmin(ctx?.userEmail);
    if (!admin) {
      fail("Active administrator access is required.", {
        statusCode: 403,
        errorCode: "admin_access_required",
      });
    }

    const db = await getDb();
    const status = decision === "approve" ? "Active" : "Rejected";
    const now = mysqlNow();

    if (itemType === "product") {
      const [current] = await db
        .select({ status: schema.products.status, advertiserEmail: schema.products.advertiserEmail, websiteUrl: schema.products.websiteUrl, category: schema.products.category })
        .from(schema.products)
        .where(eq(schema.products.id, itemId))
        .limit(1);
      if (!current || current.status !== "Pending Review") {
        fail("Product is not waiting for review.", {
          statusCode: 409,
          errorCode: "product_review_not_pending",
        });
      }
      if (decision === "approve" && (!current.websiteUrl || !current.category)) {
        fail("Produk harus memiliki website tujuan dan kategori sebelum disetujui.", {
          statusCode: 409,
          errorCode: "product_supply_incomplete",
        });
      }

      if (decision === "approve") {
        const [owner] = await db
          .select({ status: schema.users.status })
          .from(schema.users)
          .where(eq(schema.users.email, current.advertiserEmail))
          .limit(1);
        if (owner?.status !== "active") {
          fail("Advertiser harus aktif sebelum produknya disetujui.", {
            statusCode: 409,
            errorCode: "advertiser_not_active",
          });
        }
      }

      await db.transaction(async (tx) => {
        await tx
          .update(schema.products)
          .set({ status, updatedAt: now })
          .where(
            and(
              eq(schema.products.id, itemId),
              eq(schema.products.status, "Pending Review"),
            ),
          );

        const [updated] = await tx
          .select({ status: schema.products.status })
          .from(schema.products)
          .where(eq(schema.products.id, itemId))
          .limit(1);
        if (updated?.status !== status) {
          fail("Product review could not be saved.", {
            statusCode: 409,
            errorCode: "product_review_conflict",
          });
        }

        await tx.insert(schema.adminAuditLogs).values({
          id: crypto.randomUUID(),
          adminEmail: admin.email,
          action: `catalog_product_${decision}`,
          targetType: "product",
          targetId: itemId,
          details: null,
          createdAt: now,
        });
      });
    } else {
      const [current] = await db
        .select({
          status: schema.offers.status,
          advertiserEmail: schema.offers.advertiserEmail,
          productId: schema.offers.productId,
          payoutIdr: schema.offers.payoutIdr,
          campaignId: schema.offers.campaignId,
        })
        .from(schema.offers)
        .where(eq(schema.offers.id, itemId))
        .limit(1);
      if (!current || current.status !== "Pending Review") {
        fail("Offer is not waiting for review.", {
          statusCode: 409,
          errorCode: "offer_review_not_pending",
        });
      }

      if (current.campaignId) {
        fail("Campaign offer harus ditinjau bersama campaign.", {
          statusCode: 409,
          errorCode: "campaign_offer_review_required",
        });
      }
      if (decision === "approve") {
        const [owner] = await db
          .select({ status: schema.users.status })
          .from(schema.users)
          .where(eq(schema.users.email, current.advertiserEmail))
          .limit(1);
        if (owner?.status !== "active") {
          fail("Advertiser harus aktif sebelum offer-nya disetujui.", {
            statusCode: 409,
            errorCode: "advertiser_not_active",
          });
        }
        if (!current.productId || Number(current.payoutIdr) < 1) {
          fail("Offer harus ditautkan ke produk dan memiliki payout positif sebelum dapat disetujui.", {
            statusCode: 409,
            errorCode: "offer_product_required",
          });
        }
        const [product] = await db
          .select({ status: schema.products.status, websiteUrl: schema.products.websiteUrl, category: schema.products.category })
          .from(schema.products)
          .where(
            and(
              eq(schema.products.id, current.productId),
              eq(schema.products.advertiserEmail, current.advertiserEmail),
            ),
          )
          .limit(1);
        if (!product || product.status !== "Active" || !product.websiteUrl || !product.category) {
          fail("The linked product must be active before this offer can be approved.", {
            statusCode: 409,
            errorCode: "offer_product_not_active",
          });
        }
      }

      await db.transaction(async (tx) => {
        await tx
          .update(schema.offers)
          .set({ status, updatedAt: now })
          .where(
            and(
              eq(schema.offers.id, itemId),
              eq(schema.offers.status, "Pending Review"),
            ),
          );

        const [updated] = await tx
          .select({ status: schema.offers.status })
          .from(schema.offers)
          .where(eq(schema.offers.id, itemId))
          .limit(1);
        if (updated?.status !== status) {
          fail("Offer review could not be saved.", {
            statusCode: 409,
            errorCode: "offer_review_conflict",
          });
        }

        await tx.insert(schema.adminAuditLogs).values({
          id: crypto.randomUUID(),
          adminEmail: admin.email,
          action: `catalog_offer_${decision}`,
          targetType: "offer",
          targetId: itemId,
          details: null,
          createdAt: now,
        });
      });
    }

    return { itemType, itemId, status };
  },
});
