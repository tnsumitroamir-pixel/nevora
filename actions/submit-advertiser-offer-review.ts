import { and, eq, inArray } from "drizzle-orm";
import { getDb, schema } from "../server/db.js";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { mysqlNow } from "../server/mysql.js";

import {
  requireAdvertiserProfile,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Submit an advertiser-owned draft offer for admin review.",
  schema: z.object({ id: z.string().uuid() }),
  run: async ({ id }, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();
    const [current] = await db
      .select({ status: schema.offers.status, productId: schema.offers.productId })
      .from(schema.offers)
      .where(
        and(
          eq(schema.offers.id, id),
          eq(schema.offers.advertiserEmail, ownerEmail),
        ),
      )
      .limit(1);
    if (!current) {
      fail("Offer not found.", { statusCode: 404, errorCode: "offer_not_found" });
    }
    if (current.status !== "Draft" && current.status !== "Rejected") {
      fail("Offer is not ready for review.", {
        statusCode: 409,
        errorCode: "offer_not_submittable",
      });
    }

    if (current.productId) {
      const [product] = await db
        .select({ status: schema.products.status })
        .from(schema.products)
        .where(
          and(
            eq(schema.products.id, current.productId),
            eq(schema.products.advertiserEmail, ownerEmail),
          ),
        )
        .limit(1);
      if (!product || product.status !== "Active") {
        fail("The linked product must be active before this offer can be submitted.", {
          statusCode: 409,
          errorCode: "offer_product_not_active",
        });
      }
    }

    await db
      .update(schema.offers)
      .set({ status: "Pending Review", updatedAt: mysqlNow() })
      .where(
        and(
          eq(schema.offers.id, id),
          eq(schema.offers.advertiserEmail, ownerEmail),
          inArray(schema.offers.status, ["Draft", "Rejected"]),
        ),
      );

    const [submitted] = await db
      .select({ status: schema.offers.status })
      .from(schema.offers)
      .where(
        and(
          eq(schema.offers.id, id),
          eq(schema.offers.advertiserEmail, ownerEmail),
        ),
      )
      .limit(1);
    if (submitted?.status !== "Pending Review") {
      fail("Offer could not be submitted for review.", {
        statusCode: 409,
        errorCode: "offer_review_conflict",
      });
    }

    return { id, status: submitted.status };
  },
});
