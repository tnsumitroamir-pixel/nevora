import { and, eq, inArray } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requireAdvertiserProfile,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Create or update a draft offer owned by the signed-in advertiser.",
  schema: z.object({
    id: z.string().uuid().optional(),
    productId: z.string().uuid(),
    name: z.string().trim().min(1).max(160),
    payoutIdr: z.number().int().min(0).max(2_147_483_647),
  }),
  run: async ({ id, productId, name, payoutIdr }, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();

    if (productId) {
      const [product] = await db
        .select({ id: schema.products.id })
        .from(schema.products)
        .where(
          and(
            eq(schema.products.id, productId),
            eq(schema.products.advertiserEmail, ownerEmail),
          ),
        )
        .limit(1);
      if (!product) {
        fail("Product not found for this advertiser.", {
          statusCode: 404,
          errorCode: "product_not_found",
        });
      }
    }

    const now = mysqlNow();
    if (id) {
      const [current] = await db
        .select({ status: schema.offers.status })
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
        fail("Only draft or rejected offers can be edited.", {
          statusCode: 409,
          errorCode: "offer_not_editable",
        });
      }

      await db
        .update(schema.offers)
        .set({ productId, name, payoutIdr, status: "Draft", updatedAt: now })
        .where(
          and(
            eq(schema.offers.id, id),
            eq(schema.offers.advertiserEmail, ownerEmail),
            inArray(schema.offers.status, ["Draft", "Rejected"]),
          ),
        );
    } else {
      id = crypto.randomUUID();
      await db.insert(schema.offers).values({
        id,
        advertiserEmail: ownerEmail,
        productId,
        name,
        payoutIdr,
        status: "Draft",
        createdAt: now,
        updatedAt: now,
      });
    }

    const [saved] = await db
      .select()
      .from(schema.offers)
      .where(
        and(
          eq(schema.offers.id, id),
          eq(schema.offers.advertiserEmail, ownerEmail),
        ),
      )
      .limit(1);
    if (
      !saved ||
      saved.status !== "Draft" ||
      saved.name !== name ||
      saved.productId !== productId ||
      Number(saved.payoutIdr) !== payoutIdr
    ) {
      fail("Offer could not be saved as a draft.", {
        statusCode: 409,
        errorCode: "offer_save_conflict",
      });
    }

    return saved;
  },
});
