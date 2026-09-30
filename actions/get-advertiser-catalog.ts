import { desc, eq } from "drizzle-orm";
import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import {
  requireAdvertiserProfile,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Read the signed-in advertiser's products and offers.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();
    const [products, offers] = await Promise.all([
      db
        .select()
        .from(schema.products)
        .where(eq(schema.products.advertiserEmail, ownerEmail))
        .orderBy(desc(schema.products.createdAt)),
      db
        .select()
        .from(schema.offers)
        .where(eq(schema.offers.advertiserEmail, ownerEmail))
        .orderBy(desc(schema.offers.createdAt)),
    ]);

    return { products, offers };
  },
});
