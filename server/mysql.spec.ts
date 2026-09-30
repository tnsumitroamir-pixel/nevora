import { describe, expect, it } from "vitest";

import { parseMysqlConfig } from "./mysql.js";

describe("AMPPS MySQL configuration", () => {
  it("accepts the local MySQL settings used by AMPPS", () => {
    expect(
      parseMysqlConfig({
        host: "127.0.0.1",
        port: 3307,
        database: "nevora_db",
        user: "root",
        password: "",
      }),
    ).toEqual({
      host: "127.0.0.1",
      port: 3307,
      database: "nevora_db",
      user: "root",
      password: "",
    });
  });

  it("rejects non-local MySQL hosts", () => {
    expect(() =>
      parseMysqlConfig({
        host: "db.example.com",
        port: 3306,
        database: "nevora_db",
        user: "root",
        password: "",
      }),
    ).toThrow("Gunakan MySQL lokal dengan nama database yang valid.");
  });

  it("rejects unsafe database identifiers", () => {
    expect(() =>
      parseMysqlConfig({
        host: "localhost",
        port: 3306,
        database: "nevora-db",
        user: "root",
        password: "",
      }),
    ).toThrow("Gunakan MySQL lokal dengan nama database yang valid.");
  });
});
