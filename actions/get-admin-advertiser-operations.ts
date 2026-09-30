import { defineAction, fail } from "@agent-native/core/action";
import { and, count, desc, eq, gte, inArray, sum } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { getActiveAdmin } from "../server/lib/admin-access.js";

export default defineAction({
  description: "Read advertiser profiles, campaigns, offers, budgets and performance for Admin Root.",
  schema: z.object({ days: z.enum(["7", "30", "90"]).default("7") }),
  http: { method: "GET" },
  readOnly: true,
  run: async ({ days }, ctx) => {
    const admin = await getActiveAdmin(ctx?.userEmail);
    if (!admin) {
      fail("Akses Admin Root diperlukan.", {
        statusCode: 403,
        errorCode: "admin_access_required",
      });
    }

    const db = await getDb();
    const periodStart = new Date(Date.now() - (Number(days) - 1) * 86400000)
      .toISOString()
      .slice(0, 10);
    const [userTotals, advertiserTotals, campaignTotals, offerTotals, advertisers, campaigns, dailyPerformance, auditLogs] = await Promise.all([
      db.select({ total: count() }).from(schema.users),
      db.select({ total: count() }).from(schema.advertiserProfiles),
      db.select({ total: count(), budgetIdr: sum(schema.advertiserCampaigns.budgetIdr) }).from(schema.advertiserCampaigns),
      db.select({ total: count() }).from(schema.offers),
      db
        .select({
          email: schema.advertiserProfiles.ownerEmail,
          fullName: schema.advertiserProfiles.fullName,
          businessName: schema.advertiserProfiles.businessName,
          createdAt: schema.advertiserProfiles.createdAt,
          status: schema.users.status,
          walletBalanceIdr: schema.advertiserWallets.balanceIdr,
        })
        .from(schema.advertiserProfiles)
        .leftJoin(schema.users, eq(schema.users.email, schema.advertiserProfiles.ownerEmail))
        .leftJoin(schema.advertiserWallets, eq(schema.advertiserWallets.ownerEmail, schema.advertiserProfiles.ownerEmail))
        .orderBy(desc(schema.advertiserProfiles.createdAt))
        .limit(500),
      db
        .select({
          id: schema.advertiserCampaigns.id,
          name: schema.advertiserCampaigns.name,
          ownerEmail: schema.advertiserCampaigns.ownerEmail,
          businessName: schema.advertiserProfiles.businessName,
          objective: schema.advertiserCampaigns.objective,
          budgetIdr: schema.advertiserCampaigns.budgetIdr,
          status: schema.advertiserCampaigns.status,
          createdAt: schema.advertiserCampaigns.createdAt,
          offerId: schema.offers.id,
          offerStatus: schema.offers.status,
          payoutIdr: schema.offers.payoutIdr,
          productName: schema.products.name,
          category: schema.products.category,
          websiteUrl: schema.products.websiteUrl,
        })
        .from(schema.advertiserCampaigns)
        .leftJoin(schema.advertiserProfiles, eq(schema.advertiserCampaigns.ownerEmail, schema.advertiserProfiles.ownerEmail))
        .leftJoin(schema.offers, eq(schema.offers.campaignId, schema.advertiserCampaigns.id))
        .leftJoin(schema.products, eq(schema.offers.productId, schema.products.id))
        .orderBy(desc(schema.advertiserCampaigns.createdAt))
        .limit(500),
      db
        .select({
          date: schema.campaignDailyPerformance.reportDate,
          clicks: sum(schema.campaignDailyPerformance.clicks),
          conversions: sum(schema.campaignDailyPerformance.conversions),
          spendIdr: sum(schema.campaignDailyPerformance.spendIdr),
        })
        .from(schema.campaignDailyPerformance)
        .where(gte(schema.campaignDailyPerformance.reportDate, periodStart))
        .groupBy(schema.campaignDailyPerformance.reportDate)
        .orderBy(schema.campaignDailyPerformance.reportDate),
      db
        .select()
        .from(schema.adminAuditLogs)
        .where(inArray(schema.adminAuditLogs.targetType, ["advertiser", "campaign", "product", "offer"]))
        .orderBy(desc(schema.adminAuditLogs.createdAt))
        .limit(12),
    ]);

    const productCounts = await db
      .select({ ownerEmail: schema.products.advertiserEmail, total: count() })
      .from(schema.products)
      .groupBy(schema.products.advertiserEmail);
    const offerCounts = await db
      .select({ ownerEmail: schema.offers.advertiserEmail, total: count() })
      .from(schema.offers)
      .groupBy(schema.offers.advertiserEmail);
    const campaignCounts = await db
      .select({ ownerEmail: schema.advertiserCampaigns.ownerEmail, total: count() })
      .from(schema.advertiserCampaigns)
      .groupBy(schema.advertiserCampaigns.ownerEmail);
    const countMap = (rows: { ownerEmail: string; total: number }[]) =>
      new Map(rows.map((row) => [row.ownerEmail, Number(row.total)]));
    const productsByAdvertiser = countMap(productCounts);
    const offersByAdvertiser = countMap(offerCounts);
    const campaignsByAdvertiser = countMap(campaignCounts);

    return {
      metrics: {
        users: Number(userTotals[0]?.total ?? 0),
        advertisers: Number(advertiserTotals[0]?.total ?? 0),
        campaigns: Number(campaignTotals[0]?.total ?? 0),
        campaignBudgetIdr: Number(campaignTotals[0]?.budgetIdr ?? 0),
        offers: Number(offerTotals[0]?.total ?? 0),
      },
      advertisers: advertisers.map((advertiser) => ({
        ...advertiser,
        status: advertiser.status ?? "unknown",
        walletBalanceIdr: Number(advertiser.walletBalanceIdr ?? 0),
        products: productsByAdvertiser.get(advertiser.email) ?? 0,
        offers: offersByAdvertiser.get(advertiser.email) ?? 0,
        campaigns: campaignsByAdvertiser.get(advertiser.email) ?? 0,
      })),
      campaigns,
      dailyPerformance: dailyPerformance.map((row) => ({
        date: row.date,
        clicks: Number(row.clicks ?? 0),
        conversions: Number(row.conversions ?? 0),
        spendIdr: Number(row.spendIdr ?? 0),
      })),
      auditLogs,
      periodStart,
    };
  },
});
