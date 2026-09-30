import { getSession } from "@agent-native/core/server";
import { defineEventHandler, setResponseStatus } from "h3";
import { eq } from "drizzle-orm";

import { getDb, schema } from "../../../db.js";

export default defineEventHandler(async (event) => {
  const session = await getSession(event);
  if (!session?.email || !session.authUserId) {
    setResponseStatus(event, 401);
    return { ok: false, error: "Silakan masuk sebagai administrator." };
  }

  try {
    const db = await getDb();
    const [admin] = await db
      .select({
        email: schema.adminUsers.email,
        authUserId: schema.adminUsers.authUserId,
        role: schema.adminUsers.role,
        status: schema.adminUsers.status,
      })
      .from(schema.adminUsers)
      .where(eq(schema.adminUsers.email, session.email.toLowerCase()))
      .limit(1);
    if (
      !admin ||
      admin.authUserId !== session.authUserId ||
      admin.role !== "super_admin" ||
      admin.status !== "active"
    ) {
      setResponseStatus(event, 403);
      return { ok: false, error: "Akun ini bukan Administrator Nevora." };
    }
    return { ok: true };
  } catch {
    setResponseStatus(event, 503);
    return { ok: false, error: "Database Nevora belum dapat diakses." };
  }
});
