import {
  datetime,
  index,
  int,
  mysqlTable,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

const createdAt = () => datetime("created_at", { mode: "string", fsp: 3 }).notNull();
const updatedAt = () => datetime("updated_at", { mode: "string", fsp: 3 }).notNull();

export const users = mysqlTable(
  "users",
  {
    email: varchar("email", { length: 320 }).primaryKey(),
    fullName: varchar("full_name", { length: 160 }).notNull(),
    status: varchar("status", { length: 24 }).notNull().default("active"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    statusIndex: index("users_status_idx").on(table.status),
  }),
);

export const accountRoles = mysqlTable(
  "account_roles",
  {
    userEmail: varchar("user_email", { length: 320 }).notNull(),
    role: varchar("role", { length: 32 }).notNull(),
    createdAt: createdAt(),
  },
  (table) => ({
    userRoleUnique: uniqueIndex("account_roles_user_role_uidx").on(
      table.userEmail,
      table.role,
    ),
    roleIndex: index("account_roles_role_idx").on(table.role),
  }),
);

export const advertiserProfiles = mysqlTable("advertiser_profiles", {
  ownerEmail: varchar("owner_email", { length: 320 }).primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  businessName: varchar("business_name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull(),
  role: varchar("role", { length: 32 }).notNull(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const advertiserWallets = mysqlTable("advertiser_wallets", {
  ownerEmail: varchar("owner_email", { length: 320 }).primaryKey(),
  balanceIdr: int("balance_idr").notNull().default(0),
  updatedAt: updatedAt(),
});

export const advertiserCampaigns = mysqlTable(
  "advertiser_campaigns",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    ownerEmail: varchar("owner_email", { length: 320 }).notNull(),
    name: varchar("name", { length: 120 }).notNull(),
    objective: varchar("objective", { length: 24 }).notNull(),
    budgetIdr: int("budget_idr").notNull(),
    status: varchar("status", { length: 32 }).notNull().default("Draft"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    ownerCreatedIndex: index("advertiser_campaigns_owner_created_idx").on(
      table.ownerEmail,
      table.createdAt,
    ),
  }),
);

export const campaignDailyPerformance = mysqlTable(
  "campaign_daily_performance",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    ownerEmail: varchar("owner_email", { length: 320 }).notNull(),
    campaignId: varchar("campaign_id", { length: 36 }).notNull(),
    reportDate: varchar("report_date", { length: 10 }).notNull(),
    clicks: int("clicks").notNull().default(0),
    conversions: int("conversions").notNull().default(0),
    spendIdr: int("spend_idr").notNull().default(0),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    uniqueCampaignDay: uniqueIndex(
      "campaign_daily_performance_owner_campaign_day_uidx",
    ).on(table.ownerEmail, table.campaignId, table.reportDate),
    ownerDateIndex: index("campaign_daily_performance_owner_date_idx").on(
      table.ownerEmail,
      table.reportDate,
    ),
  }),
);

export const products = mysqlTable(
  "products",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    advertiserEmail: varchar("advertiser_email", { length: 320 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    websiteUrl: varchar("website_url", { length: 2048 }).notNull().default(""),
    category: varchar("category", { length: 100 }).notNull().default(""),
    status: varchar("status", { length: 32 }).notNull().default("Draft"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    advertiserIndex: index("products_advertiser_idx").on(table.advertiserEmail),
  }),
);

export const offers = mysqlTable(
  "offers",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    advertiserEmail: varchar("advertiser_email", { length: 320 }).notNull(),
    productId: varchar("product_id", { length: 36 }),
    name: varchar("name", { length: 160 }).notNull(),
    payoutIdr: int("payout_idr").notNull().default(0),
    status: varchar("status", { length: 32 }).notNull().default("Draft"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    advertiserIndex: index("offers_advertiser_idx").on(table.advertiserEmail),
    productIndex: index("offers_product_idx").on(table.productId),
  }),
);

export const publisherProfiles = mysqlTable("publisher_profiles", {
  ownerEmail: varchar("owner_email", { length: 320 }).primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull().default(""),
  status: varchar("status", { length: 32 }).notNull().default("Pending"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const publisherChannels = mysqlTable(
  "publisher_channels",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    ownerEmail: varchar("owner_email", { length: 320 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    type: varchar("type", { length: 40 }).notNull(),
    url: varchar("url", { length: 2048 }).notNull().default(""),
    status: varchar("status", { length: 32 }).notNull().default("Pending"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    ownerIndex: index("publisher_channels_owner_idx").on(table.ownerEmail),
  }),
);

export const publisherCampaigns = mysqlTable(
  "publisher_campaigns",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    publisherEmail: varchar("publisher_email", { length: 320 }).notNull(),
    campaignId: varchar("campaign_id", { length: 36 }).notNull(),
    status: varchar("status", { length: 32 }).notNull().default("Pending"),
    joinedAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    publisherCampaignUnique: uniqueIndex(
      "publisher_campaigns_publisher_campaign_uidx",
    ).on(table.publisherEmail, table.campaignId),
    campaignIndex: index("publisher_campaigns_campaign_idx").on(
      table.campaignId,
    ),
  }),
);

export const publisherEarnings = mysqlTable(
  "publisher_earnings",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    publisherEmail: varchar("publisher_email", { length: 320 }).notNull(),
    campaignId: varchar("campaign_id", { length: 36 }).notNull(),
    amountIdr: int("amount_idr").notNull(),
    status: varchar("status", { length: 32 }).notNull().default("Pending"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    ownerCreatedIndex: index("publisher_earnings_owner_created_idx").on(
      table.publisherEmail,
      table.createdAt,
    ),
  }),
);

export const publisherWithdrawals = mysqlTable(
  "publisher_withdrawals",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    publisherEmail: varchar("publisher_email", { length: 320 }).notNull(),
    amountIdr: int("amount_idr").notNull(),
    status: varchar("status", { length: 32 }).notNull().default("Pending"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => ({
    ownerCreatedIndex: index("publisher_withdrawals_owner_created_idx").on(
      table.publisherEmail,
      table.createdAt,
    ),
  }),
);

export const adminUsers = mysqlTable("admin_users", {
  email: varchar("email", { length: 320 }).primaryKey(),
  authUserId: varchar("auth_user_id", { length: 64 }).notNull(),
  fullName: varchar("full_name", { length: 160 }).notNull(),
  role: varchar("role", { length: 32 }).notNull().default("super_admin"),
  status: varchar("status", { length: 24 }).notNull().default("active"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export const adminAuditLogs = mysqlTable(
  "admin_audit_logs",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    adminEmail: varchar("admin_email", { length: 320 }).notNull(),
    action: varchar("action", { length: 120 }).notNull(),
    targetType: varchar("target_type", { length: 80 }).notNull().default(""),
    targetId: varchar("target_id", { length: 120 }).notNull().default(""),
    details: text("details"),
    createdAt: createdAt(),
  },
  (table) => ({
    adminCreatedIndex: index("admin_audit_logs_admin_created_idx").on(
      table.adminEmail,
      table.createdAt,
    ),
  }),
);

export const platformSettings = mysqlTable("platform_settings", {
  settingKey: varchar("setting_key", { length: 120 }).primaryKey(),
  settingValue: text("setting_value").notNull(),
  updatedAt: updatedAt(),
});

export const systemInstallations = mysqlTable("system_installations", {
  id: int("id").primaryKey().autoincrement(),
  version: varchar("version", { length: 40 }).notNull(),
  adminEmail: varchar("admin_email", { length: 320 }).notNull(),
  installedAt: createdAt(),
});
