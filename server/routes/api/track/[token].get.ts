import { and, eq, isNull, or } from "drizzle-orm";
import { defineEventHandler, getRouterParam, sendRedirect, setResponseStatus } from "h3";

import { getDb, schema } from "../../../db.js";
import { mysqlNow } from "../../../mysql.js";

export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, "token");
  if (!token || !/^[A-Za-z0-9_-]{32}$/.test(token)) {
    setResponseStatus(event, 404);
    return { error: "Tautan tracking tidak ditemukan." };
  }

  const db = await getDb();
  const [link] = await db
    .select({
      id: schema.publisherTrackingLinks.id,
      publisherEmail: schema.publisherTrackingLinks.publisherEmail,
      offerId: schema.publisherTrackingLinks.offerId,
      websiteUrl: schema.products.websiteUrl,
    })
    .from(schema.publisherTrackingLinks)
    .innerJoin(schema.offers, eq(schema.publisherTrackingLinks.offerId, schema.offers.id))
    .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
    .innerJoin(
      schema.publisherProfiles,
      eq(schema.publisherTrackingLinks.publisherEmail, schema.publisherProfiles.ownerEmail),
    )
    .innerJoin(schema.users, eq(schema.users.email, schema.offers.advertiserEmail))
    .leftJoin(schema.advertiserCampaigns, eq(schema.offers.campaignId, schema.advertiserCampaigns.id))
    .innerJoin(
      schema.publisherOfferApplications,
      and(
        eq(schema.publisherOfferApplications.offerId, schema.publisherTrackingLinks.offerId),
        eq(schema.publisherOfferApplications.publisherEmail, schema.publisherTrackingLinks.publisherEmail),
      ),
    )
    .innerJoin(
      schema.publisherChannels,
      and(
        eq(schema.publisherOfferApplications.channelId, schema.publisherChannels.id),
        eq(schema.publisherOfferApplications.publisherEmail, schema.publisherChannels.ownerEmail),
      ),
    )
    .where(
      and(
        eq(schema.publisherTrackingLinks.token, token),
        eq(schema.offers.status, "Active"),
        eq(schema.products.status, "Active"),
        eq(schema.users.status, "active"),
        eq(schema.publisherProfiles.status, "Active"),
        eq(schema.publisherChannels.status, "Active"),
        eq(schema.publisherOfferApplications.status, "Approved"),
        or(isNull(schema.offers.campaignId), eq(schema.advertiserCampaigns.status, "Active")),
      ),
    )
    .limit(1);
  if (!link) {
    setResponseStatus(event, 404);
    return { error: "Tautan tracking tidak aktif." };
  }

  if (!link.websiteUrl) {
    setResponseStatus(event, 404);
    return { error: "Tujuan offer tidak tersedia." };
  }
  const destination = new URL(link.websiteUrl);
  if (!['http:', 'https:'].includes(destination.protocol) || destination.username || destination.password) {
    setResponseStatus(event, 404);
    return { error: "Tujuan offer tidak valid." };
  }

  const clickId = crypto.randomUUID();
  await db.insert(schema.publisherClicks).values({
    id: clickId,
    trackingLinkId: link.id,
    publisherEmail: link.publisherEmail,
    offerId: link.offerId,
    createdAt: mysqlNow(),
  });
  destination.searchParams.set("nv_click", clickId);
  return sendRedirect(event, destination.toString(), 302);
});
