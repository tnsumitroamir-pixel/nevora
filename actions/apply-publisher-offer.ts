import { and, eq } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requirePublisherEmail,
  requirePublisherProfile,
} from "../server/lib/publisher-dashboard.js";

export default defineAction({
  description: "Apply to an active advertiser offer and create a real tracking link.",
  schema: z.object({ offerId: z.string().uuid() }),
  run: async ({ offerId }, ctx) => {
    const publisherEmail = requirePublisherEmail(ctx?.userEmail);
    await requirePublisherProfile(publisherEmail);
    const db = await getDb();
    const [offer] = await db
      .select({ id: schema.offers.id })
      .from(schema.offers)
      .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
      .where(
        and(
          eq(schema.offers.id, offerId),
          eq(schema.offers.status, "Active"),
          eq(schema.products.status, "Active"),
        ),
      )
      .limit(1);
    if (!offer) {
      fail("Offer aktif tidak ditemukan.", {
        statusCode: 404,
        errorCode: "publisher_offer_not_found",
      });
    }

    const [existing] = await db
      .select({ status: schema.publisherOfferApplications.status })
      .from(schema.publisherOfferApplications)
      .where(
        and(
          eq(schema.publisherOfferApplications.publisherEmail, publisherEmail),
          eq(schema.publisherOfferApplications.offerId, offerId),
        ),
      )
      .limit(1);
    if (existing) {
      fail("Pengajuan untuk offer ini sudah tercatat.", {
        statusCode: 409,
        errorCode: "publisher_offer_already_applied",
      });
    }

    const now = mysqlNow();
    const application = {
      id: crypto.randomUUID(),
      publisherEmail,
      offerId,
      status: "Pending" as const,
      createdAt: now,
      updatedAt: now,
    };
    await db.insert(schema.publisherOfferApplications).values(application);
    return application;
  },
});
