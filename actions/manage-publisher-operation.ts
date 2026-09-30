import { and, eq, sql } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { randomBytes } from "node:crypto";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import { getActiveAdmin } from "../server/lib/admin-access.js";

const inputSchema = z.discriminatedUnion("recordType", [
  z.object({ recordType: z.literal("publisher"), id: z.string().email(), status: z.enum(["Active", "Rejected", "Suspended"]) }),
  z.object({ recordType: z.literal("channel"), id: z.string().uuid(), status: z.enum(["Active", "Rejected"]) }),
  z.object({ recordType: z.literal("application"), id: z.string().uuid(), status: z.enum(["Approved", "Rejected"]) }),
  z.object({ recordType: z.literal("conversion"), id: z.string().uuid(), status: z.enum(["Approved", "Rejected"]) }),
  z.object({ recordType: z.literal("withdrawal"), id: z.string().uuid(), status: z.enum(["Approved", "Rejected", "Paid"]), transferReference: z.string().trim().max(160).optional() }).superRefine((value, context) => {
    if (value.status === "Paid" && !value.transferReference) {
      context.addIssue({ code: "custom", path: ["transferReference"], message: "Nomor referensi transfer wajib diisi." });
    }
  }),
  z.object({ recordType: z.literal("support"), id: z.string().uuid(), status: z.enum(["Answered", "Closed"]), adminResponse: z.string().trim().max(4000).optional() }).superRefine((value, context) => {
    if (value.status === "Answered" && !value.adminResponse) {
      context.addIssue({ code: "custom", path: ["adminResponse"], message: "Balasan Admin wajib diisi." });
    }
  }),
]);

export default defineAction({
  description: "Manage publisher records as Admin Root and write an audit event.",
  schema: inputSchema,
  run: async (input, ctx) => {
    const admin = await getActiveAdmin(ctx?.userEmail);
    if (!admin) {
      fail("Akses Admin Root diperlukan.", {
        statusCode: 403,
        errorCode: "admin_access_required",
      });
    }
    const db = await getDb();
    const now = mysqlNow();
    let previousStatus = "";

    await db.transaction(async (tx) => {
      if (input.recordType === "publisher") {
        await tx.execute(sql`SELECT owner_email FROM publisher_profiles WHERE owner_email = ${input.id.toLowerCase()} FOR UPDATE`);
        const [current] = await tx
          .select({ status: schema.publisherProfiles.status })
          .from(schema.publisherProfiles)
          .where(eq(schema.publisherProfiles.ownerEmail, input.id.toLowerCase()))
          .limit(1);
        previousStatus = current?.status ?? "";
        if (!current || (input.status === "Active" && previousStatus === "Suspended")) {
          fail("Status publisher tidak dapat diubah dari keadaan ini.", { statusCode: 409, errorCode: "publisher_status_conflict" });
        }
        await tx
          .update(schema.publisherProfiles)
          .set({ status: input.status, updatedAt: now })
          .where(and(eq(schema.publisherProfiles.ownerEmail, input.id.toLowerCase()), eq(schema.publisherProfiles.status, previousStatus)));
      } else if (input.recordType === "channel") {
        await tx.execute(sql`SELECT id FROM publisher_channels WHERE id = ${input.id} FOR UPDATE`);
        const [current] = await tx
          .select({ status: schema.publisherChannels.status })
          .from(schema.publisherChannels)
          .where(eq(schema.publisherChannels.id, input.id))
          .limit(1);
        previousStatus = current?.status ?? "";
        if (!current || !["Pending", "Rejected"].includes(previousStatus)) {
          fail("Channel sudah ditinjau atau tidak ditemukan.", { statusCode: 409, errorCode: "publisher_channel_status_conflict" });
        }
        await tx
          .update(schema.publisherChannels)
          .set({ status: input.status, updatedAt: now })
          .where(and(eq(schema.publisherChannels.id, input.id), eq(schema.publisherChannels.status, previousStatus)));
      } else if (input.recordType === "application") {
        await tx.execute(sql`SELECT id FROM publisher_offer_applications WHERE id = ${input.id} FOR UPDATE`);
        const [current] = await tx
          .select({ status: schema.publisherOfferApplications.status, offerId: schema.publisherOfferApplications.offerId, publisherEmail: schema.publisherOfferApplications.publisherEmail, publisherStatus: schema.publisherProfiles.status })
          .from(schema.publisherOfferApplications)
          .innerJoin(schema.publisherProfiles, eq(schema.publisherOfferApplications.publisherEmail, schema.publisherProfiles.ownerEmail))
          .where(eq(schema.publisherOfferApplications.id, input.id))
          .limit(1);
        previousStatus = current?.status ?? "";
        if (!current || previousStatus !== "Pending") {
          fail("Pengajuan offer tidak menunggu review.", { statusCode: 409, errorCode: "publisher_application_status_conflict" });
        }
        if (input.status === "Approved" && current.publisherStatus !== "Active") {
          fail("Publisher harus aktif sebelum pengajuan offer disetujui.", { statusCode: 409, errorCode: "publisher_not_active" });
        }
        if (input.status === "Approved") {
          const [offer] = await tx
            .select({ id: schema.offers.id, websiteUrl: schema.products.websiteUrl })
            .from(schema.offers)
            .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
            .where(and(eq(schema.offers.id, current.offerId), eq(schema.offers.status, "Active"), eq(schema.products.status, "Active")))
            .limit(1);
          if (!offer || !offer.websiteUrl) fail("Offer tidak lagi aktif atau belum memiliki tujuan.", { statusCode: 409, errorCode: "publisher_offer_inactive" });
        }
        await tx
          .update(schema.publisherOfferApplications)
          .set({ status: input.status, updatedAt: now })
          .where(and(eq(schema.publisherOfferApplications.id, input.id), eq(schema.publisherOfferApplications.status, "Pending")));
        if (input.status === "Approved") {
          await tx.insert(schema.publisherTrackingLinks).values({
            id: crypto.randomUUID(),
            publisherEmail: current.publisherEmail,
            offerId: current.offerId,
            token: randomBytes(24).toString("base64url"),
            createdAt: now,
          });
        }
      } else if (input.recordType === "conversion") {
        await tx.execute(sql`SELECT id FROM publisher_conversions WHERE id = ${input.id} FOR UPDATE`);
        const [current] = await tx
          .select({ status: schema.publisherConversions.status, publisherEmail: schema.publisherConversions.publisherEmail, offerId: schema.publisherConversions.offerId, payoutIdr: schema.publisherConversions.payoutIdr })
          .from(schema.publisherConversions)
          .where(eq(schema.publisherConversions.id, input.id))
          .limit(1);
        previousStatus = current?.status ?? "";
        if (!current || previousStatus !== "Pending") {
          fail("Conversion tidak menunggu review.", { statusCode: 409, errorCode: "publisher_conversion_status_conflict" });
        }
        await tx
          .update(schema.publisherConversions)
          .set({ status: input.status, updatedAt: now })
          .where(and(eq(schema.publisherConversions.id, input.id), eq(schema.publisherConversions.status, "Pending")));
        if (input.status === "Approved") {
          await tx.insert(schema.publisherEarningEntries).values({
            id: crypto.randomUUID(),
            conversionId: input.id,
            publisherEmail: current.publisherEmail,
            offerId: current.offerId,
            amountIdr: current.payoutIdr,
            createdAt: now,
          });
        }
      } else if (input.recordType === "withdrawal") {
        await tx.execute(sql`SELECT id FROM publisher_withdrawals WHERE id = ${input.id} FOR UPDATE`);
        const [current] = await tx
          .select({ status: schema.publisherWithdrawals.status })
          .from(schema.publisherWithdrawals)
          .where(eq(schema.publisherWithdrawals.id, input.id))
          .limit(1);
        previousStatus = current?.status ?? "";
        const validTransition =
          (input.status === "Approved" || input.status === "Rejected") && previousStatus === "Pending" ||
          input.status === "Paid" && previousStatus === "Approved";
        if (!current || !validTransition) {
          fail("Status penarikan tidak dapat diproses dari keadaan ini.", { statusCode: 409, errorCode: "publisher_withdrawal_status_conflict" });
        }
        await tx
          .update(schema.publisherWithdrawals)
          .set({
            status: input.status,
            transferReference: input.status === "Paid" ? input.transferReference! : "",
            paidAt: input.status === "Paid" ? now : null,
            reviewedBy: admin.email,
            updatedAt: now,
          })
          .where(and(eq(schema.publisherWithdrawals.id, input.id), eq(schema.publisherWithdrawals.status, previousStatus)));
      } else {
        await tx.execute(sql`SELECT id FROM publisher_support_tickets WHERE id = ${input.id} FOR UPDATE`);
        const [current] = await tx
          .select({ status: schema.publisherSupportTickets.status, adminResponse: schema.publisherSupportTickets.adminResponse })
          .from(schema.publisherSupportTickets)
          .where(eq(schema.publisherSupportTickets.id, input.id))
          .limit(1);
        previousStatus = current?.status ?? "";
        if (!current || previousStatus === "Closed") {
          fail("Tiket sudah ditutup atau tidak ditemukan.", { statusCode: 409, errorCode: "publisher_support_status_conflict" });
        }
        await tx
          .update(schema.publisherSupportTickets)
          .set({ status: input.status, adminResponse: input.adminResponse ?? current.adminResponse, reviewedBy: admin.email, updatedAt: now })
          .where(and(eq(schema.publisherSupportTickets.id, input.id), eq(schema.publisherSupportTickets.status, previousStatus)));
      }

      await tx.insert(schema.adminAuditLogs).values({
        id: crypto.randomUUID(),
        adminEmail: admin.email,
        action: `publisher_${input.recordType}_${input.status.toLowerCase()}`,
        targetType: input.recordType,
        targetId: input.id,
        details: JSON.stringify({ previousStatus, status: input.status }),
        createdAt: now,
      });
    });

    return { recordType: input.recordType, id: input.id, status: input.status };
  },
});
