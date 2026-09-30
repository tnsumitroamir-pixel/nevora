import { and, eq, inArray } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import {
  requirePublisherEmail,
  requirePublisherProfile,
} from "../server/lib/publisher-dashboard.js";

export default defineAction({
  description: "Remove a publisher-owned channel that has not been approved.",
  schema: z.object({ id: z.string().uuid() }),
  run: async ({ id }, ctx) => {
    const ownerEmail = requirePublisherEmail(ctx?.userEmail);
    await requirePublisherProfile(ownerEmail, false);
    const db = await getDb();
    const [channel] = await db
      .select({ status: schema.publisherChannels.status })
      .from(schema.publisherChannels)
      .where(
        and(
          eq(schema.publisherChannels.id, id),
          eq(schema.publisherChannels.ownerEmail, ownerEmail),
        ),
      )
      .limit(1);
    if (!channel || !["Pending", "Rejected"].includes(channel.status)) {
      fail("Channel tidak ada atau sudah disetujui Admin.", {
        statusCode: 409,
        errorCode: "publisher_channel_not_removable",
      });
    }
    await db
      .delete(schema.publisherChannels)
      .where(
        and(
          eq(schema.publisherChannels.id, id),
          eq(schema.publisherChannels.ownerEmail, ownerEmail),
          inArray(schema.publisherChannels.status, ["Pending", "Rejected"]),
        ),
      );
    return { id, deleted: true };
  },
});
