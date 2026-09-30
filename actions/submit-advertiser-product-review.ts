import { and, eq, inArray } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { mysqlNow } from "../server/mysql.js";

import { getDb, schema } from "../server/db.js";
import {
  requireAdvertiserProfile,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Submit an advertiser-owned draft product for admin review.",
  schema: z.object({ id: z.string().uuid() }),
  run: async ({ id }, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();
    const [current] = await db
      .select({
        status: schema.products.status,
        websiteUrl: schema.products.websiteUrl,
        category: schema.products.category,
      })
      .from(schema.products)
      .where(
        and(
          eq(schema.products.id, id),
          eq(schema.products.advertiserEmail, ownerEmail),
        ),
      )
      .limit(1);

    if (!current) {
      fail("Product not found.", { statusCode: 404, errorCode: "product_not_found" });
    }
    if (!current.websiteUrl || !current.category) {
      fail("Produk harus memiliki website tujuan dan kategori sebelum diajukan.", {
        statusCode: 409,
        errorCode: "product_supply_incomplete",
      });
    }
    if (current.status !== "Draft" && current.status !== "Rejected") {
      fail("Product is not ready for review.", {
        statusCode: 409,
        errorCode: "product_not_submittable",
      });
    }

    await db
      .update(schema.products)
      .set({ status: "Pending Review", updatedAt: mysqlNow() })
      .where(
        and(
          eq(schema.products.id, id),
          eq(schema.products.advertiserEmail, ownerEmail),
          inArray(schema.products.status, ["Draft", "Rejected"]),
        ),
      );

    const [submitted] = await db
      .select({ status: schema.products.status })
      .from(schema.products)
      .where(
        and(
          eq(schema.products.id, id),
          eq(schema.products.advertiserEmail, ownerEmail),
        ),
      )
      .limit(1);
    if (submitted?.status !== "Pending Review") {
      fail("Product could not be submitted for review.", {
        statusCode: 409,
        errorCode: "product_review_conflict",
      });
    }

    return { id, status: submitted.status };
  },
});
