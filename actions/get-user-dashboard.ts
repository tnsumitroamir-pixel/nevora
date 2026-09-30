import { defineAction, fail } from "@agent-native/core/action";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";

export default defineAction({
  description: "Read the signed-in user's account roles and existing Nevora profiles.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async (_args, ctx) => {
    const email = ctx?.userEmail?.trim().toLowerCase();
    if (!email) {
      fail("Masuk untuk membuka dashboard pengguna.", {
        statusCode: 401,
        errorCode: "unauthenticated",
      });
    }

    const db = await getDb();
    const [[account], roles, [publisher], [advertiser]] = await Promise.all([
      db
        .select({ fullName: schema.users.fullName, status: schema.users.status })
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .limit(1),
      db
        .select({ role: schema.accountRoles.role })
        .from(schema.accountRoles)
        .where(eq(schema.accountRoles.userEmail, email)),
      db
        .select({ status: schema.publisherProfiles.status })
        .from(schema.publisherProfiles)
        .where(eq(schema.publisherProfiles.ownerEmail, email))
        .limit(1),
      db
        .select({ role: schema.advertiserProfiles.role, businessName: schema.advertiserProfiles.businessName })
        .from(schema.advertiserProfiles)
        .innerJoin(schema.users, eq(schema.users.email, schema.advertiserProfiles.ownerEmail))
        .where(and(
          eq(schema.advertiserProfiles.ownerEmail, email),
          eq(schema.users.status, "active"),
        ))
        .limit(1),
    ]);

    if (!account || account.status !== "active") {
      fail("Akun pengguna belum tersedia atau tidak aktif.", {
        statusCode: 403,
        errorCode: "user_account_unavailable",
      });
    }

    return {
      profile: { fullName: account.fullName, email, status: account.status },
      roles: roles.map(({ role }) => role),
      publisher: publisher ? { status: publisher.status } : null,
      advertiser: advertiser?.role === "Advertiser"
        ? { businessName: advertiser.businessName }
        : null,
    };
  },
});
