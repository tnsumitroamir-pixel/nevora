import { eq } from "drizzle-orm";

import { getDb, schema } from "../db.js";

export async function getActiveAdmin(email: string | null | undefined) {
  const normalizedEmail = email?.trim().toLowerCase();
  if (!normalizedEmail) return null;

  const db = await getDb();
  const [admin] = await db
    .select({
      email: schema.adminUsers.email,
      role: schema.adminUsers.role,
      status: schema.adminUsers.status,
    })
    .from(schema.adminUsers)
    .where(eq(schema.adminUsers.email, normalizedEmail))
    .limit(1);

  if (!admin || admin.role !== "super_admin" || admin.status !== "active") {
    return null;
  }

  return admin;
}
