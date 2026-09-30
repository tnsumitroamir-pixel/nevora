import { and, eq } from "drizzle-orm";
import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requirePublisherEmail,
  requirePublisherProfile,
} from "../server/lib/publisher-dashboard.js";

export default defineAction({
  description: "Register a publisher-owned channel for administrator review.",
  schema: z.object({
    name: z.string().trim().min(1).max(160),
    type: z.enum(["Website", "Social Media", "App", "Game", "Other"]),
    url: z.string().trim().max(2048).refine((value) => {
      try {
        const url = new URL(value);
        return (url.protocol === "http:" || url.protocol === "https:") && !url.username && !url.password;
      } catch {
        return false;
      }
    }),
  }),
  run: async ({ name, type, url }, ctx) => {
    const ownerEmail = requirePublisherEmail(ctx?.userEmail);
    await requirePublisherProfile(ownerEmail, false);
    const db = await getDb();
    const channel = {
      id: crypto.randomUUID(),
      ownerEmail,
      name,
      type,
      url,
      status: "Pending",
      createdAt: mysqlNow(),
      updatedAt: mysqlNow(),
    };
    await db.insert(schema.publisherChannels).values(channel);
    return channel;
  },
});
