import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requirePublisherEmail,
  requirePublisherProfile,
} from "../server/lib/publisher-dashboard.js";

export default defineAction({
  description: "Create a publisher support ticket stored in SQL.",
  schema: z.object({
    subject: z.string().trim().min(1).max(160),
    message: z.string().trim().min(1).max(4000),
  }),
  run: async ({ subject, message }, ctx) => {
    const publisherEmail = requirePublisherEmail(ctx?.userEmail);
    await requirePublisherProfile(publisherEmail, false);
    const now = mysqlNow();
    const ticket = {
      id: crypto.randomUUID(),
      publisherEmail,
      subject,
      message,
      status: "Open" as const,
      adminResponse: "",
      reviewedBy: null,
      createdAt: now,
      updatedAt: now,
    };
    await (await getDb()).insert(schema.publisherSupportTickets).values(ticket);
    return ticket;
  },
});
