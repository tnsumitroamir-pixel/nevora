import { defineAction, fail } from "@agent-native/core/action";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requireAdvertiserProfile,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

function isCalendarDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
  );
}

export default defineAction({
  description:
    "Create or replace one campaign's daily clicks, conversions, and spend values.",
  schema: z.object({
    campaignId: z.string().uuid().describe("Campaign id"),
    reportDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .refine(isCalendarDate)
      .describe("Report date in YYYY-MM-DD format"),
    clicks: z.number().int().min(0).max(2_147_483_647).describe("Click count"),
    conversions: z
      .number()
      .int()
      .min(0)
      .max(2_147_483_647)
      .describe("Conversion count"),
    spendIdr: z
      .number()
      .int()
      .min(0)
      .max(2_147_483_647)
      .describe("Spend in Indonesian rupiah"),
  }),
  run: async (
    { campaignId, reportDate, clicks, conversions, spendIdr },
    ctx,
  ) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(ownerEmail);
    const db = await getDb();
    const [campaign] = await db
      .select({ id: schema.advertiserCampaigns.id })
      .from(schema.advertiserCampaigns)
      .where(
        and(
          eq(schema.advertiserCampaigns.id, campaignId),
          eq(schema.advertiserCampaigns.ownerEmail, ownerEmail),
        ),
      )
      .limit(1);

    if (!campaign) {
      fail("Campaign not found.", {
        statusCode: 404,
        errorCode: "campaign_not_found",
      });
    }

    const now = mysqlNow();
    const performance = {
      id: crypto.randomUUID(),
      ownerEmail,
      campaignId,
      reportDate,
      clicks,
      conversions,
      spendIdr,
      createdAt: now,
      updatedAt: now,
    };
    await db
      .insert(schema.campaignDailyPerformance)
      .values(performance)
      .onDuplicateKeyUpdate({ set: { clicks, conversions, spendIdr, updatedAt: now } });
    return performance;
  },
});
