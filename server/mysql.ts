import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { createPool } from "mysql2/promise";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";

import * as schema from "../drizzle/mysql-schema.js";

export type MysqlConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};

const configPath = join(process.cwd(), "data", "mysql-install.json");
const validDatabase = /^[A-Za-z0-9_]{1,64}$/;
const loopbackHosts = new Set(["localhost", "127.0.0.1", "::1"]);
let pool: ReturnType<typeof createPool> | undefined;
let db: MySql2Database<typeof schema> | undefined;

export function parseMysqlConfig(value: unknown): MysqlConfig {
  if (!value || typeof value !== "object") {
    throw new Error("Invalid MySQL configuration.");
  }
  const input = value as Record<string, unknown>;
  const config = {
    host: String(input.host ?? "")
      .trim()
      .toLowerCase(),
    port: Number(input.port),
    database: String(input.database ?? "").trim(),
    user: String(input.user ?? "").trim(),
    password: String(input.password ?? ""),
  };
  if (
    !loopbackHosts.has(config.host) ||
    !Number.isInteger(config.port) ||
    config.port < 1 ||
    config.port > 65535 ||
    !validDatabase.test(config.database) ||
    !config.user ||
    config.user.length > 128 ||
    config.password.length > 256
  ) {
    throw new Error("Gunakan MySQL lokal dengan nama database yang valid.");
  }
  return config;
}

export async function getStoredMysqlConfig() {
  try {
    return parseMysqlConfig(JSON.parse(await readFile(configPath, "utf8")));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function saveMysqlConfig(config: MysqlConfig) {
  await mkdir(join(process.cwd(), "data"), { recursive: true, mode: 0o700 });
  const temporaryPath = `${configPath}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, JSON.stringify(config), {
    encoding: "utf8",
    flag: "wx",
    mode: 0o600,
  });
  try {
    await rename(temporaryPath, configPath);
  } catch (error) {
    const { unlink } = await import("node:fs/promises");
    await unlink(temporaryPath).catch(() => undefined);
    throw error;
  }
}

export async function getMysqlConfig() {
  const config = await getStoredMysqlConfig();
  if (!config) throw new Error("MySQL belum dikonfigurasi. Jalankan instalasi Nevora.");
  return config;
}

export async function openMysqlPool(input?: MysqlConfig) {
  const config = input ?? (await getMysqlConfig());
  return createPool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
    charset: "utf8mb4",
    connectionLimit: 5,
    timezone: "Z",
    supportBigNumbers: true,
    decimalNumbers: true,
  });
}

export function mysqlNow() {
  return new Date().toISOString().slice(0, 23).replace("T", " ");
}

export async function closeMysqlPool() {
  if (pool) await pool.end();
  pool = undefined;
  db = undefined;
}

export async function getMysqlDb() {
  if (!pool || !db) {
    const config = await getMysqlConfig();
    pool = createPool({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      charset: "utf8mb4",
      connectionLimit: 5,
      timezone: "Z",
      supportBigNumbers: true,
      decimalNumbers: true,
    });
    db = drizzle(pool, { schema, mode: "default" });
  }
  return db;
}

export { schema };
