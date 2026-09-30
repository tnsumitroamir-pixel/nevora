import { and, desc, eq } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { getActiveAdmin } from "../server/lib/admin-access.js";

export default defineAction({
  description: "Read products and offers waiting for administrator review.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) => {
    const admin = await getActiveAdmin(ctx?.userEmail);
    if (!admin) {
      fail("Active administrator access is required.", {
        statusCode: 403,
        errorCode: "admin_access_required",
      });
    }

    const db = await getDb();
    const [products, offers] = await Promise.all([
      db
        .select()
        .from(schema.products)
        .where(eq(schema.products.status, "Pending Review"))
        .orderBy(desc(schema.products.createdAt)),
      db
        .select({
          id: schema.offers.id,
          advertiserEmail: schema.offers.advertiserEmail,
          productId: schema.offers.productId,
          name: schema.offers.name,
          payoutIdr: schema.offers.payoutIdr,
          status: schema.offers.status,
          createdAt: schema.offers.createdAt,
          productName: schema.products.name,
          productStatus: schema.products.status,
        })
        .from(schema.offers)
        .leftJoin(schema.products, eq(schema.offers.productId, schema.products.id))
        .where(eq(schema.offers.status, "Pending Review"))
        .orderBy(desc(schema.offers.createdAt)),
    ]);

    return { products, offers };
  },
});
