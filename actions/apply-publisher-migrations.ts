import { migrate } from "drizzle-orm/mysql2/migrator";
import { defineAction, fail } from "@agent-native/core/action";
import { z } from "zod";

import { getDb } from "../server/db.js";
import { getActiveAdmin } from "../server/lib/admin-access.js";

export default defineAction({
  description: "Apply pending Nevora MySQL migrations as Admin Root.",
  schema: z.object({}),
  run: async (_args, ctx) => {
    const admin = await getActiveAdmin(ctx?.userEmail);
    if (!admin) {
      fail("Akses Admin Root diperlukan.", {
        statusCode: 403,
        errorCode: "admin_access_required",
      });
    }
    await migrate(await getDb(), { migrationsFolder: "drizzle/mysql-migrations" });
    return { applied: true };
  },
});
