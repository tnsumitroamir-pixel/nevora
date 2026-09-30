import { count, desc, eq, inArray, sum } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { getActiveAdmin } from "../server/lib/admin-access.js";

export default defineAction({
  description: "Read publisher applications, channels, conversions, withdrawals and support tickets for Admin Root.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) => {
    const admin = await getActiveAdmin(ctx?.userEmail);
    if (!admin) {
      fail("Akses Admin Root diperlukan.", {
        statusCode: 403,
        errorCode: "admin_access_required",
      });
    }
    const db = await getDb();
    const [publishers, channels, applications, conversions, withdrawals, supportTickets, clickTotals, conversionTotals, approvedEarnings, paidWithdrawals, auditLogs] =
      await Promise.all([
        db
          .select()
          .from(schema.publisherProfiles)
          .orderBy(desc(schema.publisherProfiles.createdAt)),
        db
          .select({
            id: schema.publisherChannels.id,
            ownerEmail: schema.publisherChannels.ownerEmail,
            publisherName: schema.publisherProfiles.fullName,
            name: schema.publisherChannels.name,
            type: schema.publisherChannels.type,
            url: schema.publisherChannels.url,
            status: schema.publisherChannels.status,
            createdAt: schema.publisherChannels.createdAt,
          })
          .from(schema.publisherChannels)
          .leftJoin(
            schema.publisherProfiles,
            eq(schema.publisherChannels.ownerEmail, schema.publisherProfiles.ownerEmail),
          )
          .orderBy(desc(schema.publisherChannels.createdAt)),
        db
          .select({
            id: schema.publisherOfferApplications.id,
            publisherEmail: schema.publisherOfferApplications.publisherEmail,
            publisherName: schema.publisherProfiles.fullName,
            offerId: schema.publisherOfferApplications.offerId,
            offerName: schema.offers.name,
            status: schema.publisherOfferApplications.status,
            createdAt: schema.publisherOfferApplications.createdAt,
          })
          .from(schema.publisherOfferApplications)
          .leftJoin(
            schema.publisherProfiles,
            eq(schema.publisherOfferApplications.publisherEmail, schema.publisherProfiles.ownerEmail),
          )
          .leftJoin(
            schema.offers,
            eq(schema.publisherOfferApplications.offerId, schema.offers.id),
          )
          .orderBy(desc(schema.publisherOfferApplications.createdAt)),
        db
          .select({
            id: schema.publisherConversions.id,
            clickId: schema.publisherConversions.clickId,
            publisherEmail: schema.publisherConversions.publisherEmail,
            publisherName: schema.publisherProfiles.fullName,
            advertiserEmail: schema.publisherConversions.advertiserEmail,
            offerId: schema.publisherConversions.offerId,
            offerName: schema.offers.name,
            externalEventId: schema.publisherConversions.externalEventId,
            payoutIdr: schema.publisherConversions.payoutIdr,
            status: schema.publisherConversions.status,
            createdAt: schema.publisherConversions.createdAt,
          })
          .from(schema.publisherConversions)
          .leftJoin(
            schema.publisherProfiles,
            eq(schema.publisherConversions.publisherEmail, schema.publisherProfiles.ownerEmail),
          )
          .leftJoin(schema.offers, eq(schema.publisherConversions.offerId, schema.offers.id))
          .orderBy(desc(schema.publisherConversions.createdAt)),
        db
          .select({
            id: schema.publisherWithdrawals.id,
            publisherEmail: schema.publisherWithdrawals.publisherEmail,
            publisherName: schema.publisherProfiles.fullName,
            amountIdr: schema.publisherWithdrawals.amountIdr,
            status: schema.publisherWithdrawals.status,
            transferReference: schema.publisherWithdrawals.transferReference,
            createdAt: schema.publisherWithdrawals.createdAt,
            paidAt: schema.publisherWithdrawals.paidAt,
          })
          .from(schema.publisherWithdrawals)
          .leftJoin(
            schema.publisherProfiles,
            eq(schema.publisherWithdrawals.publisherEmail, schema.publisherProfiles.ownerEmail),
          )
          .orderBy(desc(schema.publisherWithdrawals.createdAt)),
        db
          .select({
            id: schema.publisherSupportTickets.id,
            publisherEmail: schema.publisherSupportTickets.publisherEmail,
            publisherName: schema.publisherProfiles.fullName,
            subject: schema.publisherSupportTickets.subject,
            message: schema.publisherSupportTickets.message,
            status: schema.publisherSupportTickets.status,
            adminResponse: schema.publisherSupportTickets.adminResponse,
            createdAt: schema.publisherSupportTickets.createdAt,
          })
          .from(schema.publisherSupportTickets)
          .leftJoin(
            schema.publisherProfiles,
            eq(schema.publisherSupportTickets.publisherEmail, schema.publisherProfiles.ownerEmail),
          )
          .orderBy(desc(schema.publisherSupportTickets.createdAt)),
        db.select({ clicks: count() }).from(schema.publisherClicks),
        db.select({ status: schema.publisherConversions.status, total: count() }).from(schema.publisherConversions).groupBy(schema.publisherConversions.status),
        db.select({ amountIdr: sum(schema.publisherEarningEntries.amountIdr) }).from(schema.publisherEarningEntries),
        db.select({ amountIdr: sum(schema.publisherWithdrawals.amountIdr) }).from(schema.publisherWithdrawals).where(eq(schema.publisherWithdrawals.status, "Paid")),
        db.select().from(schema.adminAuditLogs).where(inArray(schema.adminAuditLogs.targetType, ["publisher", "channel", "application", "conversion", "withdrawal", "support"])).orderBy(desc(schema.adminAuditLogs.createdAt)).limit(100),
      ]);

    return {
      publishers,
      channels,
      applications,
      conversions,
      withdrawals,
      supportTickets,
      auditLogs,
      performance: {
        clicks: Number(clickTotals[0]?.clicks ?? 0),
        approvedConversions: Number(conversionTotals.find((row) => row.status === "Approved")?.total ?? 0),
        pendingConversions: Number(conversionTotals.find((row) => row.status === "Pending")?.total ?? 0),
        earnedIdr: Number(approvedEarnings[0]?.amountIdr ?? 0),
        paidIdr: Number(paidWithdrawals[0]?.amountIdr ?? 0),
      },
    };
  },
});
