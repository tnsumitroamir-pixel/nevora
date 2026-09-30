import { eq } from "drizzle-orm";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb, schema } from "../server/db.js";
import { mysqlNow } from "../server/mysql.js";
import {
  requirePublisherEmail,
  requirePublisherProfile,
} from "../server/lib/publisher-dashboard.js";

export default defineAction({
  description: "Update the signed-in publisher's profile in SQL.",
  schema: z.object({
    fullName: z.string().trim().min(1).max(120),
    phone: z.string().trim().min(7).max(24),
  }),
  run: async ({ fullName, phone }, ctx) => {
    const email = requirePublisherEmail(ctx?.userEmail);
    await requirePublisherProfile(email, false);
    const db = await getDb();
    await db
      .update(schema.publisherProfiles)
      .set({ fullName, phone, updatedAt: mysqlNow() })
      .where(eq(schema.publisherProfiles.ownerEmail, email));
    const [profile] = await db
      .select()
      .from(schema.publisherProfiles)
      .where(eq(schema.publisherProfiles.ownerEmail, email))
      .limit(1);
    if (!profile || profile.fullName !== fullName || profile.phone !== phone) {
      fail("Profil Publisher belum berhasil disimpan.", {
        statusCode: 409,
        errorCode: "publisher_profile_save_conflict",
      });
    }
    return profile;
  },
});
