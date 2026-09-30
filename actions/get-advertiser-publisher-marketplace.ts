import { and, desc, eq, isNull, or } from "drizzle-orm";
import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { requireAdvertiserProfile, requireUserEmail } from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Read verified publisher channels and publishers approved for this advertiser's offers.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) => {
    const advertiserEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(advertiserEmail);
    const db = await getDb();
    const [channels, selectedPublishers] = await Promise.all([
      db
        .select({
          id: schema.publisherChannels.id,
          name: schema.publisherChannels.name,
          type: schema.publisherChannels.type,
          url: schema.publisherChannels.url,
          publisherName: schema.publisherProfiles.fullName,
        })
        .from(schema.publisherChannels)
        .innerJoin(schema.publisherProfiles, eq(schema.publisherChannels.ownerEmail, schema.publisherProfiles.ownerEmail))
        .where(and(eq(schema.publisherChannels.status, "Active"), eq(schema.publisherProfiles.status, "Active")))
        .orderBy(desc(schema.publisherChannels.createdAt)),
      db
        .select({
          id: schema.publisherOfferApplications.id,
          publisherName: schema.publisherProfiles.fullName,
          channelName: schema.publisherChannels.name,
          channelType: schema.publisherChannels.type,
          channelUrl: schema.publisherChannels.url,
          offerName: schema.offers.name,
          campaignName: schema.advertiserCampaigns.name,
          status: schema.publisherOfferApplications.status,
          createdAt: schema.publisherOfferApplications.createdAt,
        })
        .from(schema.publisherOfferApplications)
        .innerJoin(schema.offers, eq(schema.publisherOfferApplications.offerId, schema.offers.id))
        .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
        .innerJoin(schema.users, eq(schema.users.email, schema.offers.advertiserEmail))
        .innerJoin(schema.publisherProfiles, eq(schema.publisherOfferApplications.publisherEmail, schema.publisherProfiles.ownerEmail))
        .innerJoin(schema.publisherChannels, and(
          eq(schema.publisherOfferApplications.channelId, schema.publisherChannels.id),
          eq(schema.publisherOfferApplications.publisherEmail, schema.publisherChannels.ownerEmail),
        ))
        .leftJoin(schema.advertiserCampaigns, eq(schema.offers.campaignId, schema.advertiserCampaigns.id))
        .where(and(
          eq(schema.offers.advertiserEmail, advertiserEmail),
          eq(schema.publisherOfferApplications.status, "Approved"),
          eq(schema.publisherChannels.status, "Active"),
          eq(schema.publisherProfiles.status, "Active"),
          eq(schema.offers.status, "Active"),
          eq(schema.products.status, "Active"),
          eq(schema.users.status, "active"),
          or(isNull(schema.offers.campaignId), eq(schema.advertiserCampaigns.status, "Active")),
        ))
        .orderBy(desc(schema.publisherOfferApplications.createdAt)),
    ]);

    return { channels, selectedPublishers };
  },
});
