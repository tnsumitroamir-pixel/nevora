import { and, count, desc, eq, gte, inArray, ne, sql, sum } from "drizzle-orm";

import { fail } from "@agent-native/core/action";

import { getDb, schema } from "../db.js";

export function requirePublisherEmail(email: string | null | undefined): string {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) {
    fail("Masuk untuk membuka dashboard Publisher.", {
      statusCode: 401,
      errorCode: "unauthenticated",
    });
  }
  return normalizedEmail!;
}

export async function requirePublisherProfile(email: string, active = true) {
  const db = await getDb();
  const [profile] = await db
    .select()
    .from(schema.publisherProfiles)
    .where(eq(schema.publisherProfiles.ownerEmail, email))
    .limit(1);

  if (!profile) {
    fail("Lengkapi profil Publisher terlebih dahulu.", {
      statusCode: 403,
      errorCode: "publisher_profile_required",
    });
  }
  if (active && profile.status !== "Active") {
    fail("Akun Publisher menunggu persetujuan Admin.", {
      statusCode: 403,
      errorCode: "publisher_approval_required",
    });
  }
  return profile;
}

function numeric(value: string | number | null | undefined) {
  return Number(value ?? 0);
}

function emptyDashboard(profile: typeof schema.publisherProfiles.$inferSelect | null) {
  return {
    profile,
    summary: null,
    marketplace: [],
    applications: [],
    channels: [],
    trackingLinks: [],
    conversions: [],
    earnings: [],
    withdrawals: [],
    supportTickets: [],
    dailyPerformance: [],
    periodStart: null,
  };
}

export async function getPublisherDashboard(email: string) {
  const db = await getDb();
  const [profile] = await db
    .select()
    .from(schema.publisherProfiles)
    .where(eq(schema.publisherProfiles.ownerEmail, email))
    .limit(1);

  if (!profile || profile.status !== "Active") return emptyDashboard(profile ?? null);

  const fromDate = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const fromTimestamp = `${fromDate} 00:00:00`;
  const clickDay = sql<string>`DATE(${schema.publisherClicks.createdAt})`;
  const conversionDay = sql<string>`DATE(${schema.publisherConversions.createdAt})`;
  const earningDay = sql<string>`DATE(${schema.publisherEarningEntries.createdAt})`;

  const [
    marketplace,
    applications,
    channels,
    trackingLinks,
    conversions,
    earnings,
    withdrawals,
    supportTickets,
    clickTotals,
    conversionTotals,
    approvedEarnings,
    reservedWithdrawals,
    pendingEarnings,
    dailyClicks,
    dailyConversions,
    dailyEarnings,
  ] = await Promise.all([
    db
      .select({
        id: schema.offers.id,
        name: schema.offers.name,
        payoutIdr: schema.offers.payoutIdr,
        category: schema.products.category,
        websiteUrl: schema.products.websiteUrl,
        advertiserName: schema.advertiserProfiles.businessName,
        createdAt: schema.offers.createdAt,
      })
      .from(schema.offers)
      .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
      .leftJoin(
        schema.advertiserProfiles,
        eq(schema.offers.advertiserEmail, schema.advertiserProfiles.ownerEmail),
      )
      .where(
        and(
          eq(schema.offers.status, "Active"),
          eq(schema.products.status, "Active"),
          ne(schema.products.websiteUrl, ""),
        ),
      )
      .orderBy(desc(schema.offers.createdAt)),
    db
      .select({
        id: schema.publisherOfferApplications.id,
        offerId: schema.publisherOfferApplications.offerId,
        status: schema.publisherOfferApplications.status,
        createdAt: schema.publisherOfferApplications.createdAt,
        offerName: schema.offers.name,
        payoutIdr: schema.offers.payoutIdr,
      })
      .from(schema.publisherOfferApplications)
      .leftJoin(
        schema.offers,
        eq(schema.publisherOfferApplications.offerId, schema.offers.id),
      )
      .where(eq(schema.publisherOfferApplications.publisherEmail, email))
      .orderBy(desc(schema.publisherOfferApplications.createdAt)),
    db
      .select()
      .from(schema.publisherChannels)
      .where(eq(schema.publisherChannels.ownerEmail, email))
      .orderBy(desc(schema.publisherChannels.createdAt)),
    db
      .select({
        id: schema.publisherTrackingLinks.id,
        token: schema.publisherTrackingLinks.token,
        offerId: schema.publisherTrackingLinks.offerId,
        createdAt: schema.publisherTrackingLinks.createdAt,
        offerName: schema.offers.name,
        clicks: count(schema.publisherClicks.id),
      })
      .from(schema.publisherTrackingLinks)
      .innerJoin(
        schema.offers,
        eq(schema.publisherTrackingLinks.offerId, schema.offers.id),
      )
      .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
      .innerJoin(
        schema.publisherOfferApplications,
        and(
          eq(schema.publisherOfferApplications.offerId, schema.publisherTrackingLinks.offerId),
          eq(schema.publisherOfferApplications.publisherEmail, schema.publisherTrackingLinks.publisherEmail),
          eq(schema.publisherOfferApplications.status, "Approved"),
        ),
      )
      .leftJoin(
        schema.publisherClicks,
        eq(schema.publisherTrackingLinks.id, schema.publisherClicks.trackingLinkId),
      )
      .where(
        and(
          eq(schema.publisherTrackingLinks.publisherEmail, email),
          eq(schema.offers.status, "Active"),
          eq(schema.products.status, "Active"),
        ),
      )
      .groupBy(
        schema.publisherTrackingLinks.id,
        schema.publisherTrackingLinks.token,
        schema.publisherTrackingLinks.offerId,
        schema.publisherTrackingLinks.createdAt,
        schema.offers.name,
      )
      .orderBy(desc(schema.publisherTrackingLinks.createdAt)),
    db
      .select({
        id: schema.publisherConversions.id,
        offerId: schema.publisherConversions.offerId,
        clickId: schema.publisherConversions.clickId,
        externalEventId: schema.publisherConversions.externalEventId,
        payoutIdr: schema.publisherConversions.payoutIdr,
        status: schema.publisherConversions.status,
        createdAt: schema.publisherConversions.createdAt,
        offerName: schema.offers.name,
      })
      .from(schema.publisherConversions)
      .leftJoin(
        schema.offers,
        eq(schema.publisherConversions.offerId, schema.offers.id),
      )
      .where(eq(schema.publisherConversions.publisherEmail, email))
      .orderBy(desc(schema.publisherConversions.createdAt))
      .limit(100),
    db
      .select({
        id: schema.publisherEarningEntries.id,
        conversionId: schema.publisherEarningEntries.conversionId,
        offerId: schema.publisherEarningEntries.offerId,
        amountIdr: schema.publisherEarningEntries.amountIdr,
        createdAt: schema.publisherEarningEntries.createdAt,
        offerName: schema.offers.name,
      })
      .from(schema.publisherEarningEntries)
      .leftJoin(
        schema.offers,
        eq(schema.publisherEarningEntries.offerId, schema.offers.id),
      )
      .where(eq(schema.publisherEarningEntries.publisherEmail, email))
      .orderBy(desc(schema.publisherEarningEntries.createdAt))
      .limit(100),
    db
      .select()
      .from(schema.publisherWithdrawals)
      .where(eq(schema.publisherWithdrawals.publisherEmail, email))
      .orderBy(desc(schema.publisherWithdrawals.createdAt)),
    db
      .select()
      .from(schema.publisherSupportTickets)
      .where(eq(schema.publisherSupportTickets.publisherEmail, email))
      .orderBy(desc(schema.publisherSupportTickets.createdAt)),
    db
      .select({ clicks: count() })
      .from(schema.publisherClicks)
      .where(eq(schema.publisherClicks.publisherEmail, email)),
    db
      .select({ status: schema.publisherConversions.status, total: count() })
      .from(schema.publisherConversions)
      .where(eq(schema.publisherConversions.publisherEmail, email))
      .groupBy(schema.publisherConversions.status),
    db
      .select({ amountIdr: sum(schema.publisherEarningEntries.amountIdr) })
      .from(schema.publisherEarningEntries)
      .where(eq(schema.publisherEarningEntries.publisherEmail, email)),
    db
      .select({ amountIdr: sum(schema.publisherWithdrawals.amountIdr) })
      .from(schema.publisherWithdrawals)
      .where(
        and(
          eq(schema.publisherWithdrawals.publisherEmail, email),
          inArray(schema.publisherWithdrawals.status, ["Pending", "Approved", "Paid"]),
        ),
      ),
    db
      .select({ amountIdr: sum(schema.publisherConversions.payoutIdr) })
      .from(schema.publisherConversions)
      .where(
        and(
          eq(schema.publisherConversions.publisherEmail, email),
          eq(schema.publisherConversions.status, "Pending"),
        ),
      ),
    db
      .select({ date: clickDay, clicks: count() })
      .from(schema.publisherClicks)
      .where(
        and(
          eq(schema.publisherClicks.publisherEmail, email),
          gte(schema.publisherClicks.createdAt, fromTimestamp),
        ),
      )
      .groupBy(clickDay)
      .orderBy(clickDay),
    db
      .select({ date: conversionDay, status: schema.publisherConversions.status, total: count() })
      .from(schema.publisherConversions)
      .where(
        and(
          eq(schema.publisherConversions.publisherEmail, email),
          gte(schema.publisherConversions.createdAt, fromTimestamp),
        ),
      )
      .groupBy(conversionDay, schema.publisherConversions.status)
      .orderBy(conversionDay),
    db
      .select({ date: earningDay, amountIdr: sum(schema.publisherEarningEntries.amountIdr) })
      .from(schema.publisherEarningEntries)
      .where(
        and(
          eq(schema.publisherEarningEntries.publisherEmail, email),
          gte(schema.publisherEarningEntries.createdAt, fromTimestamp),
        ),
      )
      .groupBy(earningDay)
      .orderBy(earningDay),
  ]);

  const conversionsByDate = new Map<string, { conversions: number; pending: number }>();
  for (const row of dailyConversions) {
    const values = conversionsByDate.get(row.date) ?? { conversions: 0, pending: 0 };
    if (row.status === "Approved") values.conversions = numeric(row.total);
    if (row.status === "Pending") values.pending = numeric(row.total);
    conversionsByDate.set(row.date, values);
  }
  const earningsByDate = new Map(
    dailyEarnings.map((row) => [row.date, numeric(row.amountIdr)]),
  );
  const approvedConversionCount = numeric(
    conversionTotals.find((row) => row.status === "Approved")?.total,
  );
  const pendingConversionCount = numeric(
    conversionTotals.find((row) => row.status === "Pending")?.total,
  );
  const earnedIdr = numeric(approvedEarnings[0]?.amountIdr);
  const reservedIdr = numeric(reservedWithdrawals[0]?.amountIdr);
  const pendingEarningsIdr = numeric(pendingEarnings[0]?.amountIdr);

  return {
    profile,
    summary: {
      clicks: numeric(clickTotals[0]?.clicks),
      approvedConversions: approvedConversionCount,
      pendingConversions: pendingConversionCount,
      pendingEarningsIdr,
      earnedIdr,
      reservedIdr,
      availableIdr: earnedIdr - reservedIdr,
    },
    marketplace,
    applications,
    channels,
    trackingLinks: trackingLinks.map((link) => ({ ...link, clicks: numeric(link.clicks) })),
    conversions,
    earnings,
    withdrawals,
    supportTickets,
    dailyPerformance: dailyClicks.map((row) => {
      const conversionsForDay = conversionsByDate.get(row.date);
      return {
        date: row.date,
        clicks: numeric(row.clicks),
        conversions: conversionsForDay?.conversions ?? 0,
        pendingConversions: conversionsForDay?.pending ?? 0,
        earnedIdr: earningsByDate.get(row.date) ?? 0,
      };
    }),
    periodStart: fromDate,
  };
}
