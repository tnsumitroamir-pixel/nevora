import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import {
  getPublisherDashboard,
  requirePublisherEmail,
} from "../server/lib/publisher-dashboard.js";

export default defineAction({
  description: "Read the signed-in publisher's profile, offers, tracking and ledger data.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) =>
    getPublisherDashboard(requirePublisherEmail(ctx?.userEmail)),
});
