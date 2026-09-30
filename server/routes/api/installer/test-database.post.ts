import { defineEventHandler, readBody, setResponseStatus } from "h3";
import { z } from "zod";

import { isLocalInstallerRequest } from "../../../lib/installer.js";
import { openMysqlPool, parseMysqlConfig } from "../../../mysql.js";

const inputSchema = z.object({
  host: z.string(),
  port: z.number(),
  database: z.string(),
  user: z.string(),
  password: z.string(),
});

function connectionMessage(error: unknown) {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (code === "ER_ACCESS_DENIED_ERROR") {
    return "Username atau password MySQL tidak benar.";
  }
  if (code === "ER_BAD_DB_ERROR") {
    return "Database tidak ditemukan. Buat database ini di phpMyAdmin AMPPS terlebih dahulu.";
  }
  if (code === "ECONNREFUSED" || code === "ETIMEDOUT") {
    return "MySQL belum aktif atau host dan port tidak dapat dijangkau.";
  }
  return "Koneksi MySQL gagal. Periksa kembali konfigurasi database Anda.";
}

export default defineEventHandler(async (event) => {
  if (!isLocalInstallerRequest(event)) {
    setResponseStatus(event, 403);
    return { ok: false, error: "Installer hanya dapat digunakan melalui localhost." };
  }

  try {
    const config = parseMysqlConfig(inputSchema.parse(await readBody(event)));
    const pool = await openMysqlPool(config);
    try {
      const [rows] = await pool.query("SELECT VERSION() AS version");
      const result = rows as Array<{ version: string }>;
      return { ok: true, serverVersion: result[0]?.version ?? "MySQL" };
    } finally {
      await pool.end();
    }
  } catch (error) {
    setResponseStatus(event, 400);
    return {
      ok: false,
      error:
        error instanceof z.ZodError
          ? "Lengkapi host, port, nama database, dan username MySQL dengan benar."
          : connectionMessage(error),
    };
  }
});
