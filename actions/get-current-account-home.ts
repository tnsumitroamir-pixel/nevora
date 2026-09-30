import { defineAction } from "@agent-native/core/action";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { requireUserEmail } from "../server/lib/advertiser-dashboard.js";

export default defineAction({
  description: "Return the signed-in account's existing Nevora dashboard path.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) => {
    const email = requireUserEmail(ctx?.userEmail);
    const db = await getDb();
    const [publisher, advertiser, roles] = await Promise.all([
      db
        .select({ email: schema.publisherProfiles.ownerEmail })
        .from(schema.publisherProfiles)
        .where(eq(schema.publisherProfiles.ownerEmail, email))
        .limit(1),
      db
        .select({ email: schema.advertiserProfiles.ownerEmail })
        .from(schema.advertiserProfiles)
        .where(eq(schema.advertiserProfiles.ownerEmail, email))
        .limit(1),
      db
        .select({ role: schema.accountRoles.role })
        .from(schema.accountRoles)
        .where(eq(schema.accountRoles.userEmail, email)),
    ]);
    if (roles.some(({ role }) => role === "Konsumen")) return { path: "/user" };
    if (publisher[0]) return { path: "/publisher" };
    if (advertiser[0]) return { path: "/advertiser" };
    return { path: "/" };
  },
});
