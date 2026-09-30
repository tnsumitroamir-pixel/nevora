import { and, eq, isNull, or } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requirePublisherEmail,
  requirePublisherProfile,
} from "../server/lib/publisher-dashboard.js";

export default defineAction({
  description: "Apply to an active advertiser offer using one verified publisher channel.",
  schema: z.object({ offerId: z.string().uuid(), channelId: z.string().uuid() }),
  run: async ({ offerId, channelId }, ctx) => {
    const publisherEmail = requirePublisherEmail(ctx?.userEmail);
    await requirePublisherProfile(publisherEmail);
    const db = await getDb();
    const [channel] = await db
      .select({ id: schema.publisherChannels.id })
      .from(schema.publisherChannels)
      .where(and(
        eq(schema.publisherChannels.id, channelId),
        eq(schema.publisherChannels.ownerEmail, publisherEmail),
        eq(schema.publisherChannels.status, "Active"),
      ))
      .limit(1);
    if (!channel) {
      fail("Pilih channel aktif yang sudah diverifikasi.", {
        statusCode: 409,
        errorCode: "publisher_channel_required",
      });
    }

    const [offer] = await db
      .select({ id: schema.offers.id, websiteUrl: schema.products.websiteUrl, payoutIdr: schema.offers.payoutIdr })
      .from(schema.offers)
      .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
      .innerJoin(schema.users, eq(schema.users.email, schema.offers.advertiserEmail))
      .leftJoin(schema.advertiserCampaigns, eq(schema.offers.campaignId, schema.advertiserCampaigns.id))
      .where(
        and(
          eq(schema.offers.id, offerId),
          eq(schema.offers.status, "Active"),
          eq(schema.products.status, "Active"),
          eq(schema.users.status, "active"),
          or(isNull(schema.offers.campaignId), eq(schema.advertiserCampaigns.status, "Active")),
        ),
      )
      .limit(1);
    if (!offer || !offer.websiteUrl || Number(offer.payoutIdr) < 1) {
      fail("Offer aktif tidak ditemukan.", {
        statusCode: 404,
        errorCode: "publisher_offer_not_found",
      });
    }

    const [existing] = await db
      .select({ id: schema.publisherOfferApplications.id, status: schema.publisherOfferApplications.status })
      .from(schema.publisherOfferApplications)
      .where(
        and(
          eq(schema.publisherOfferApplications.publisherEmail, publisherEmail),
          eq(schema.publisherOfferApplications.offerId, offerId),
        ),
      )
      .limit(1);
    if (existing && existing.status !== "Rejected") {
      fail("Pengajuan untuk offer ini sudah tercatat.", {
        statusCode: 409,
        errorCode: "publisher_offer_already_applied",
      });
    }

    const now = mysqlNow();
    if (existing) {
      await db
        .update(schema.publisherOfferApplications)
        .set({ channelId, status: "Pending", updatedAt: now })
        .where(and(
          eq(schema.publisherOfferApplications.id, existing.id),
          eq(schema.publisherOfferApplications.status, "Rejected"),
        ));
      const [reapplied] = await db
        .select()
        .from(schema.publisherOfferApplications)
        .where(eq(schema.publisherOfferApplications.id, existing.id))
        .limit(1);
      if (reapplied?.status !== "Pending" || reapplied.channelId !== channelId) {
        fail("Pengajuan ulang belum dapat disimpan.", {
          statusCode: 409,
          errorCode: "publisher_offer_reapplication_conflict",
        });
      }
      return reapplied;
    }

    const application = {
      id: crypto.randomUUID(),
      publisherEmail,
      offerId,
      channelId,
      status: "Pending" as const,
      createdAt: now,
      updatedAt: now,
    };
    await db.insert(schema.publisherOfferApplications).values(application);
    return application;
  },
});
