import { getSession } from "@agent-native/core/server";
import { defineEventHandler, readBody, setResponseStatus } from "h3";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";
import { z } from "zod";

import { mysqlNow, openMysqlPool, parseMysqlConfig, saveMysqlConfig } from "../../../mysql.js";
import { schema } from "../../../db.js";
import { isLocalInstallerRequest } from "../../../lib/installer.js";

const inputSchema = z.object({
  database: z.object({
    host: z.string(),
    port: z.number(),
    database: z.string(),
    user: z.string(),
    password: z.string(),
  }),
  application: z.object({
    name: z.string().trim().min(1).max(80),
    timezone: z.string().min(1).max(80),
    currency: z.enum(["IDR", "USD"]),
  }),
  administrator: z.object({
    fullName: z.string().trim().min(1).max(160),
    email: z.string().trim().email().max(320),
  }),
});

export default defineEventHandler(async (event) => {
  if (!isLocalInstallerRequest(event)) {
    setResponseStatus(event, 403);
    return { ok: false, error: "Instalasi hanya dapat dijalankan melalui localhost." };
  }

  const input = inputSchema.safeParse(await readBody(event));
  if (!input.success) {
    setResponseStatus(event, 400);
    return { ok: false, error: "Periksa kembali informasi instalasi." };
  }

  const session = await getSession(event);
  const adminEmail = input.data.administrator.email.toLowerCase();
  if (!session?.email || !session.authUserId || session.email.toLowerCase() !== adminEmail) {
    setResponseStatus(event, 401);
    return {
      ok: false,
      error: "Akun administrator harus didaftarkan dan masuk terlebih dahulu.",
    };
  }

  const authUserId = session.authUserId;
  let config;
  try {
    config = parseMysqlConfig(input.data.database);
  } catch {
    setResponseStatus(event, 400);
    return { ok: false, error: "Konfigurasi MySQL tidak valid." };
  }

  let pool;
  try {
    pool = await openMysqlPool(config);
    await pool.query("SELECT 1");
    const db = drizzle(pool, { schema, mode: "default" });
    await migrate(db, { migrationsFolder: "drizzle/mysql-migrations" });
    await saveMysqlConfig(config);

    const now = mysqlNow();
    await db.transaction(async (tx) => {
      const [existing] = await tx
        .select({ id: schema.systemInstallations.id })
        .from(schema.systemInstallations)
        .limit(1);
      if (existing) {
        throw new Error("NEVORA_ALREADY_INSTALLED");
      }

      await tx
        .insert(schema.users)
        .values({
          email: adminEmail,
          fullName: input.data.administrator.fullName,
          createdAt: now,
          updatedAt: now,
        })
        .onDuplicateKeyUpdate({
          set: { fullName: input.data.administrator.fullName, updatedAt: now },
        });
      await tx.insert(schema.accountRoles).values({
        userEmail: adminEmail,
        role: "Administrator",
        createdAt: now,
      });
      const adminUser: typeof schema.adminUsers.$inferInsert = {
        email: adminEmail,
        authUserId,
        fullName: input.data.administrator.fullName,
        role: "super_admin",
        status: "active",
        createdAt: now,
        updatedAt: now,
      };
      await tx.insert(schema.adminUsers).values(adminUser);
      await tx
        .insert(schema.platformSettings)
        .values([
          {
            settingKey: "app_name",
            settingValue: input.data.application.name,
            updatedAt: now,
          },
          {
            settingKey: "timezone",
            settingValue: input.data.application.timezone,
            updatedAt: now,
          },
          {
            settingKey: "currency",
            settingValue: input.data.application.currency,
            updatedAt: now,
          },
        ])
        .onDuplicateKeyUpdate({ set: { updatedAt: now } });
      await tx.insert(schema.systemInstallations).values({
        version: "1.0.0",
        adminEmail,
        installedAt: now,
      });
    });

    return { ok: true, adminEmail };
  } catch (error) {
    if (error instanceof Error && error.message === "NEVORA_ALREADY_INSTALLED") {
      setResponseStatus(event, 409);
      return { ok: false, error: "Nevora sudah selesai diinstal." };
    }
    setResponseStatus(event, 500);
    return {
      ok: false,
      error:
        error && typeof error === "object" && "code" in error
          ? "Instalasi database gagal. Periksa izin MySQL dan coba lagi."
          : "Instalasi belum selesai. Periksa koneksi MySQL dan coba lagi.",
    };
  } finally {
    await pool?.end();
  }
});
