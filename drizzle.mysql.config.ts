import { defineConfig } from "drizzle-kit";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const { host, port, database, user, password } = JSON.parse(
  readFileSync(join(process.cwd(), "data", "mysql-install.json"), "utf8"),
) as {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};

export default defineConfig({
  schema: "./drizzle/mysql-schema.ts",
  out: "./drizzle/mysql-migrations",
  dialect: "mysql",
  dbCredentials: {
    url: `mysql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`,
  },
});
