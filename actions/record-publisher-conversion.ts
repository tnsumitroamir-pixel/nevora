import { and, eq } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requireAdvertiserProfile,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Submit an advertiser-authenticated publisher conversion for review.",
  schema: z.object({
    clickId: z.string().uuid(),
    externalEventId: z.string().trim().min(1).max(160),
  }),
  run: async ({ clickId, externalEventId }, ctx) => {
    const advertiserEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(advertiserEmail);
    const db = await getDb();
    const [click] = await db
      .select({
        id: schema.publisherClicks.id,
        publisherEmail: schema.publisherClicks.publisherEmail,
        offerId: schema.publisherClicks.offerId,
        payoutIdr: schema.offers.payoutIdr,
      })
      .from(schema.publisherClicks)
      .innerJoin(schema.offers, eq(schema.publisherClicks.offerId, schema.offers.id))
      .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
      .innerJoin(
        schema.publisherOfferApplications,
        and(
          eq(schema.publisherOfferApplications.offerId, schema.offers.id),
          eq(schema.publisherOfferApplications.publisherEmail, schema.publisherClicks.publisherEmail),
          eq(schema.publisherOfferApplications.status, "Approved"),
        ),
      )
      .where(
        and(
          eq(schema.publisherClicks.id, clickId),
          eq(schema.offers.advertiserEmail, advertiserEmail),
          eq(schema.offers.status, "Active"),
          eq(schema.products.status, "Active"),
        ),
      )
      .limit(1);
    if (!click) {
      fail("Klik tidak ditemukan untuk offer aktif milik advertiser ini.", {
        statusCode: 404,
        errorCode: "publisher_click_not_found",
      });
    }

    const now = mysqlNow();
    const conversion = {
      id: crypto.randomUUID(),
      clickId,
      publisherEmail: click.publisherEmail,
      offerId: click.offerId,
      advertiserEmail,
      externalEventId,
      payoutIdr: click.payoutIdr,
      status: "Pending",
      createdAt: now,
      updatedAt: now,
    };
    await db.insert(schema.publisherConversions).values(conversion);
    return { id: conversion.id, status: conversion.status };
  },
});
