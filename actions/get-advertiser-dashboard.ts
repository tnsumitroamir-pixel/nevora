import { defineAction } from "@agent-native/core/action";
import { z } from "zod";

import {
  getAdvertiserDashboard,
  requireUserEmail,
} from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description:
    "Read the signed-in advertiser's real campaign budget, seven-day performance, and recent campaigns from SQL.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) => {
    const ownerEmail = requireUserEmail(ctx?.userEmail);
    return getAdvertiserDashboard(ownerEmail);
  },
});
