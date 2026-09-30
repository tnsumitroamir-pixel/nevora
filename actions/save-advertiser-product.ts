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
  description: "Create or update a draft product owned by the signed-in advertiser.",
  schema: z.object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1).max(160),
    websiteUrl: z
      .string()
      .trim()
      .max(2048)
      .refine((value) => {
        if (!value) return true;
        try {
          const url = new URL(value);
          return (
            (url.protocol === "http:" || url.protocol === "https:") &&
            !url.username &&
            !url.password
          );
        } catch {
          return false;
        }
      }),
    category: z.string().trim().max(100),
  }),
  run: async ({ id, name, websiteUrl, category }, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();
    const now = mysqlNow();

    if (id) {
      const [current] = await db
        .select({ status: schema.products.status })
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
      if (current.status !== "Draft" && current.status !== "Rejected") {
        fail("Only draft or rejected products can be edited.", {
          statusCode: 409,
          errorCode: "product_not_editable",
        });
      }

      await db
        .update(schema.products)
        .set({ name, websiteUrl, category, status: "Draft", updatedAt: now })
        .where(
          and(
            eq(schema.products.id, id),
            eq(schema.products.advertiserEmail, ownerEmail),
            inArray(schema.products.status, ["Draft", "Rejected"]),
          ),
        );
    } else {
      id = crypto.randomUUID();
      await db.insert(schema.products).values({
        id,
        advertiserEmail: ownerEmail,
        name,
        websiteUrl,
        category,
        status: "Draft",
        createdAt: now,
        updatedAt: now,
      });
    }

    const [saved] = await db
      .select()
      .from(schema.products)
      .where(
        and(
          eq(schema.products.id, id),
          eq(schema.products.advertiserEmail, ownerEmail),
        ),
      )
      .limit(1);
    if (
      !saved ||
      saved.status !== "Draft" ||
      saved.name !== name ||
      saved.websiteUrl !== websiteUrl ||
      saved.category !== category
    ) {
      fail("Product could not be saved as a draft.", {
        statusCode: 409,
        errorCode: "product_save_conflict",
      });
    }

    return saved;
  },
});
