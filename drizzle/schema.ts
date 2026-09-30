import {
  index,
  integer,
  now,
  table,
  text,
  uniqueIndex,
} from "@agent-native/core/db/schema";

export const advertiserProfiles = table("advertiser_profiles", {
  ownerEmail: text("owner_email").primaryKey(),
  fullName: text("full_name").notNull(),
  businessName: text("business_name").notNull(),
  phone: text("phone").notNull(),
  role: text("role").notNull(),
  createdAt: text("created_at").notNull().default(now()),
  updatedAt: text("updated_at").notNull().default(now()),
});

export const advertiserWallets = table("advertiser_wallets", {
  ownerEmail: text("owner_email").primaryKey(),
  balanceIdr: integer("balance_idr").notNull(),
  updatedAt: text("updated_at").notNull().default(now()),
});

export const advertiserCampaigns = table(
  "advertiser_campaigns",
  {
    id: text("id").primaryKey(),
    ownerEmail: text("owner_email").notNull(),
    name: text("name").notNull(),
    objective: text("objective").notNull(),
    budgetIdr: integer("budget_idr").notNull(),
    status: text("status").notNull().default("Draft"),
    createdAt: text("created_at").notNull().default(now()),
    updatedAt: text("updated_at").notNull().default(now()),
  },
  (campaigns) => ({
    ownerCreatedIndex: index("advertiser_campaigns_owner_created_idx").on(
      campaigns.ownerEmail,
      campaigns.createdAt,
    ),
  }),
);

export const campaignDailyPerformance = table(
  "campaign_daily_performance",
  {
    id: text("id").primaryKey(),
    ownerEmail: text("owner_email").notNull(),
    campaignId: text("campaign_id").notNull(),
    reportDate: text("report_date").notNull(),
    clicks: integer("clicks").notNull().default(0),
    conversions: integer("conversions").notNull().default(0),
    spendIdr: integer("spend_idr").notNull().default(0),
    createdAt: text("created_at").notNull().default(now()),
    updatedAt: text("updated_at").notNull().default(now()),
  },
  (performance) => ({
    uniqueCampaignDay: uniqueIndex(
      "campaign_daily_performance_owner_campaign_day_uidx",
    ).on(
      performance.ownerEmail,
      performance.campaignId,
      performance.reportDate,
    ),
    ownerDateIndex: index("campaign_daily_performance_owner_date_idx").on(
      performance.ownerEmail,
      performance.reportDate,
    ),
  }),
);
