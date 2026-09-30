import { eq } from "drizzle-orm";
import { getRequestContext } from "@agent-native/core/server";

import { getDb, schema } from "../db.js";

export async function getActiveAdmin(email: string | null | undefined) {
  const normalizedEmail = email?.trim().toLowerCase();
  const authUserId = getRequestContext()?.authUserId;
  if (!normalizedEmail || !authUserId) return null;

  const db = await getDb();
  const [admin] = await db
    .select({
      email: schema.adminUsers.email,
      authUserId: schema.adminUsers.authUserId,
      role: schema.adminUsers.role,
      status: schema.adminUsers.status,
    })
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, normalizedEmail))
    .limit(1);

  if (
    !admin ||
    admin.authUserId !== authUserId ||
    admin.role !== "super_admin" ||
    admin.status !== "active"
  ) {
    return null;
  }

  return admin;
}
