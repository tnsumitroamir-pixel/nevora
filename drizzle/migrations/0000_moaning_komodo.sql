CREATE TABLE "advertiser_campaigns" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_email" text NOT NULL,
	"name" text NOT NULL,
	"objective" text NOT NULL,
	"budget_idr" integer NOT NULL,
	"status" text DEFAULT 'Draft' NOT NULL,
	"created_at" text DEFAULT now() NOT NULL,
	"updated_at" text DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "advertiser_profiles" (
	"owner_email" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"business_name" text NOT NULL,
	"phone" text NOT NULL,
	"role" text NOT NULL,
	"created_at" text DEFAULT now() NOT NULL,
	"updated_at" text DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "advertiser_wallets" (
	"owner_email" text PRIMARY KEY NOT NULL,
	"balance_idr" integer NOT NULL,
	"updated_at" text DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "campaign_daily_performance" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_email" text NOT NULL,
	"campaign_id" text NOT NULL,
	"report_date" text NOT NULL,
	"clicks" integer DEFAULT 0 NOT NULL,
	"conversions" integer DEFAULT 0 NOT NULL,
	"spend_idr" integer DEFAULT 0 NOT NULL,
	"created_at" text DEFAULT now() NOT NULL,
	"updated_at" text DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "advertiser_campaigns_owner_created_idx" ON "advertiser_campaigns" USING btree ("owner_email","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "campaign_daily_performance_owner_campaign_day_uidx" ON "campaign_daily_performance" USING btree ("owner_email","campaign_id","report_date");--> statement-breakpoint
CREATE INDEX "campaign_daily_performance_owner_date_idx" ON "campaign_daily_performance" USING btree ("owner_email","report_date");