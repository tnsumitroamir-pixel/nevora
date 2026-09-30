import { defineAction, fail } from "@agent-native/core/action";
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
    budgetIdr: z
      .number()
      .int()
      .min(1)
      .max(2_147_483_647)
      .describe("Campaign budget in Indonesian rupiah"),
  }),
  run: async ({ name, objective, budgetIdr }, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();
    const now = mysqlNow();
    const campaign = {
      id: crypto.randomUUID(),
      ownerEmail,
      name,
      objective,
      budgetIdr,
      status: "Draft",
      createdAt: now,
      updatedAt: now,
    };
    await db.insert(schema.advertiserCampaigns).values(campaign);
    return campaign;
  },
});
