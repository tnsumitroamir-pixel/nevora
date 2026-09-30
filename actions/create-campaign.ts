import { defineAction, fail } from "@agent-native/core/action";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requireAdvertiserProfile,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Create a draft campaign for the signed-in advertiser.",
  schema: z.object({
    name: z.string().trim().min(1).max(120).describe("Campaign name"),
    objective: z
      .enum(["Install", "Purchase", "View", "Lead"])
      .describe("Campaign goal"),
    productId: z.string().uuid(),
    payoutIdr: z.number().int().min(1).max(2_147_483_647),
    budgetIdr: z
      .number()
      .int()
      .min(1)
      .max(2_147_483_647)
      .describe("Campaign budget in Indonesian rupiah"),
  }),
  run: async ({ name, objective, productId, payoutIdr, budgetIdr }, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();
    const [product] = await db
      .select({ id: schema.products.id })
      .from(schema.products)
      .where(
        and(
          eq(schema.products.id, productId),
          eq(schema.products.advertiserEmail, ownerEmail),
          eq(schema.products.status, "Active"),
        ),
      )
      .limit(1);
    if (!product) {
      fail("Pilih produk aktif milik advertiser ini.", {
        statusCode: 409,
        errorCode: "campaign_product_required",
      });
    }

    const now = mysqlNow();
    const campaignId = crypto.randomUUID();
    const offerId = crypto.randomUUID();
    const campaign = {
      id: campaignId,
      ownerEmail,
      name,
      objective,
      budgetIdr,
      productId,
      payoutIdr,
      status: "Draft",
      createdAt: now,
      updatedAt: now,
    };
    await db.transaction(async (tx) => {
      await tx.insert(schema.advertiserCampaigns).values(campaign);
      await tx.insert(schema.offers).values({
        id: offerId,
        advertiserEmail: ownerEmail,
        campaignId,
        productId,
        name,
        payoutIdr,
        status: "Draft",
        createdAt: now,
        updatedAt: now,
      });
    });
    return { ...campaign, offerId };
  },
});
