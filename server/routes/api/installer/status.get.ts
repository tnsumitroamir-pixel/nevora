import { defineEventHandler, setResponseStatus } from "h3";

import { isLocalInstallerRequest } from "../../../lib/installer.js";

import { getStoredMysqlConfig, openMysqlPool } from "../../../mysql.js";

export default defineEventHandler(async (event) => {
  if (!isLocalInstallerRequest(event)) {
    setResponseStatus(event, 403);
    return { installed: false, localAccess: false };
  }

  const config = await getStoredMysqlConfig();
  if (!config) {
    return {
      installed: false,
      localAccess: true,
      databaseConfigured: false,
      databaseConnected: false,
      nodeVersion: process.versions.node,
    };
  }

  let pool;
  try {
    pool = await openMysqlPool(config);
    const [rows] = await pool.query(
      "SELECT `version`, `admin_email`, `created_at` FROM `system_installations` ORDER BY `id` DESC LIMIT 1",
    );
    const installations = rows as Array<{
      version: string;
      admin_email: string;
      created_at: string;
    }>;
    const installation = installations[0];
    return {
      installed: Boolean(installation),
      localAccess: true,
      databaseConfigured: true,
      databaseConnected: true,
      nodeVersion: process.versions.node,
      ...(installation
        ? {
            version: installation.version,
            adminEmail: installation.admin_email,
            installedAt: installation.created_at,
          }
        : {}),
    };
  } catch {
    return {
      installed: false,
      localAccess: true,
      databaseConfigured: true,
      databaseConnected: false,
      nodeVersion: process.versions.node,
    };
  } finally {
    await pool?.end();
  }
});
