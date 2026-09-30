import { fail } from "@agent-native/core/action";
import { and, asc, count, desc, eq, gte, sum } from "drizzle-orm";

import { getDb, schema } from "../db.js";

export function requireUserEmail(email: string | null | undefined) {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) {
    fail("Sign in to access the advertiser dashboard.", {
      statusCode: 401,
      errorCode: "unauthenticated",
    });
  }
  return normalizedEmail;
}

export async function requireAdvertiserProfile(ownerEmail: string) {
  const db = await getDb();
  const [profile] = await db
    .select({
      fullName: schema.advertiserProfiles.fullName,
      businessName: schema.advertiserProfiles.businessName,
      role: schema.advertiserProfiles.role,
      status: schema.users.status,
    })
    .from(schema.advertiserProfiles)
    .leftJoin(schema.users, eq(schema.users.email, schema.advertiserProfiles.ownerEmail))
    .where(eq(schema.advertiserProfiles.ownerEmail, ownerEmail))
    .limit(1);

  if (!profile || profile.role !== "Advertiser" || profile.status !== "active") {
    fail("This dashboard is available to advertiser accounts.", {
      statusCode: 403,
      errorCode: "advertiser_access_required",
    });
  }

  return profile;
}

function numeric(value: string | number | null | undefined) {
  return Number(value ?? 0);
}

export async function getAdvertiserDashboard(ownerEmail: string) {
  const db = await getDb();
  const [profile] = await db
    .select({
      fullName: schema.advertiserProfiles.fullName,
      businessName: schema.advertiserProfiles.businessName,
      role: schema.advertiserProfiles.role,
      status: schema.users.status,
    })
    .from(schema.advertiserProfiles)
    .leftJoin(schema.users, eq(schema.users.email, schema.advertiserProfiles.ownerEmail))
    .where(eq(schema.advertiserProfiles.ownerEmail, ownerEmail))
    .limit(1);

  if (profile?.role !== "Advertiser" || profile.status !== "active") {
    return {
      profile: profile ?? null,
      summary: null,
      walletBalanceIdr: null,
      activeProducts: [],
      dailyPerformance: [],
      campaigns: [],
      periodStart: null,
    };
  }

  const today = new Date();
  const fromDate = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - 6,
    ),
  )
    .toISOString()
    .slice(0, 10);

  const [
    budgetTotals,
    lifetimeTotals,
    walletRows,
    dailyRows,
    periodCampaignRows,
    campaignSpendRows,
    campaigns,
    activeProducts,
  ] = await Promise.all([
    db
      .select({
        budgetIdr: sum(schema.advertiserCampaigns.budgetIdr),
        campaignCount: count(),
      })
      .from(schema.advertiserCampaigns)
      .where(eq(schema.advertiserCampaigns.ownerEmail, ownerEmail)),
    db
      .select({ spendIdr: sum(schema.campaignDailyPerformance.spendIdr) })
      .from(schema.campaignDailyPerformance)
      .where(eq(schema.campaignDailyPerformance.ownerEmail, ownerEmail)),
    db
      .select({ balanceIdr: schema.advertiserWallets.balanceIdr })
      .from(schema.advertiserWallets)
      .where(eq(schema.advertiserWallets.ownerEmail, ownerEmail))
      .limit(1),
    db
      .select({
        date: schema.campaignDailyPerformance.reportDate,
        clicks: sum(schema.campaignDailyPerformance.clicks),
        conversions: sum(schema.campaignDailyPerformance.conversions),
        spendIdr: sum(schema.campaignDailyPerformance.spendIdr),
      })
      .from(schema.campaignDailyPerformance)
      .where(
        and(
          eq(schema.campaignDailyPerformance.ownerEmail, ownerEmail),
          gte(schema.campaignDailyPerformance.reportDate, fromDate),
        ),
      )
      .groupBy(schema.campaignDailyPerformance.reportDate)
      .orderBy(asc(schema.campaignDailyPerformance.reportDate)),
    db
      .select({
        campaignId: schema.campaignDailyPerformance.campaignId,
        clicks: sum(schema.campaignDailyPerformance.clicks),
        conversions: sum(schema.campaignDailyPerformance.conversions),
        spendIdr: sum(schema.campaignDailyPerformance.spendIdr),
      })
      .from(schema.campaignDailyPerformance)
      .where(
        and(
          eq(schema.campaignDailyPerformance.ownerEmail, ownerEmail),
          gte(schema.campaignDailyPerformance.reportDate, fromDate),
        ),
      )
      .groupBy(schema.campaignDailyPerformance.campaignId),
    db
      .select({
        campaignId: schema.campaignDailyPerformance.campaignId,
        spendIdr: sum(schema.campaignDailyPerformance.spendIdr),
      })
      .from(schema.campaignDailyPerformance)
      .where(eq(schema.campaignDailyPerformance.ownerEmail, ownerEmail))
      .groupBy(schema.campaignDailyPerformance.campaignId),
    db
      .select({
        id: schema.advertiserCampaigns.id,
        name: schema.advertiserCampaigns.name,
        objective: schema.advertiserCampaigns.objective,
        budgetIdr: schema.advertiserCampaigns.budgetIdr,
        productId: schema.advertiserCampaigns.productId,
        payoutIdr: schema.advertiserCampaigns.payoutIdr,
        status: schema.advertiserCampaigns.status,
        createdAt: schema.advertiserCampaigns.createdAt,
      })
      .from(schema.advertiserCampaigns)
      .where(eq(schema.advertiserCampaigns.ownerEmail, ownerEmail))
      .orderBy(desc(schema.advertiserCampaigns.createdAt))
      .limit(8),
    db
      .select({ id: schema.products.id, name: schema.products.name })
      .from(schema.products)
      .where(and(eq(schema.products.advertiserEmail, ownerEmail), eq(schema.products.status, "Active")))
      .orderBy(asc(schema.products.name)),
  ]);

  const allocatedBudgetIdr = numeric(budgetTotals[0]?.budgetIdr);
  const spentAllTimeIdr = numeric(lifetimeTotals[0]?.spendIdr);
  const periodMetrics = dailyRows.map((row) => ({
    date: row.date,
    clicks: numeric(row.clicks),
    conversions: numeric(row.conversions),
    spendIdr: numeric(row.spendIdr),
  }));
  const periodCampaigns = new Map(
    periodCampaignRows.map((row) => [row.campaignId, row]),
  );
  const campaignSpend = new Map(
    campaignSpendRows.map((row) => [row.campaignId, numeric(row.spendIdr)]),
  );

  return {
    profile,
    summary: {
      allocatedBudgetIdr,
      campaignCount: budgetTotals[0]?.campaignCount ?? 0,
      clicks: periodMetrics.reduce((total, row) => total + row.clicks, 0),
      conversions: periodMetrics.reduce(
        (total, row) => total + row.conversions,
        0,
      ),
      spendIdr: periodMetrics.reduce((total, row) => total + row.spendIdr, 0),
      spentAllTimeIdr,
      remainingBudgetIdr: allocatedBudgetIdr - spentAllTimeIdr,
    },
    walletBalanceIdr:
      walletRows[0] === undefined ? null : Number(walletRows[0].balanceIdr),
    dailyPerformance: periodMetrics,
    activeProducts,
    campaigns: campaigns.map((campaign) => {
      const period = periodCampaigns.get(campaign.id);
      const spentIdr = campaignSpend.get(campaign.id) ?? 0;
      return {
        ...campaign,
        clicks: numeric(period?.clicks),
        conversions: numeric(period?.conversions),
        periodSpendIdr: numeric(period?.spendIdr),
        spentIdr,
        budgetUsedPercent:
          campaign.budgetIdr > 0
            ? Math.round((spentIdr / campaign.budgetIdr) * 100)
            : 0,
      };
    }),
    periodStart: fromDate,
  };
}
