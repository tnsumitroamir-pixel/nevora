import { and, desc, eq, isNull } from "drizzle-orm";
import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import {
  requireAdvertiserProfile,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Read this advertiser's real publisher clicks that do not yet have a conversion.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) => {
    const advertiserEmail = requireUserEmail(ctx?.userEmail);
    await requireAdvertiserProfile(advertiserEmail);
    const db = await getDb();
    return db
      .select({
        clickId: schema.publisherClicks.id,
        publisherEmail: schema.publisherClicks.publisherEmail,
        publisherName: schema.publisherProfiles.fullName,
        offerId: schema.offers.id,
        offerName: schema.offers.name,
        clickedAt: schema.publisherClicks.createdAt,
      })
      .from(schema.publisherClicks)
      .innerJoin(schema.offers, eq(schema.publisherClicks.offerId, schema.offers.id))
      .innerJoin(schema.products, eq(schema.offers.productId, schema.products.id))
      .innerJoin(
        schema.publisherProfiles,
        eq(schema.publisherClicks.publisherEmail, schema.publisherProfiles.ownerEmail),
      )
      .leftJoin(
        schema.publisherConversions,
        eq(schema.publisherClicks.id, schema.publisherConversions.clickId),
      )
      .where(
        and(
          eq(schema.offers.advertiserEmail, advertiserEmail),
          eq(schema.offers.status, "Active"),
          eq(schema.products.status, "Active"),
          eq(schema.publisherProfiles.status, "Active"),
          isNull(schema.publisherConversions.id),
        ),
      )
      .orderBy(desc(schema.publisherClicks.createdAt))
      .limit(200);
  },
});
