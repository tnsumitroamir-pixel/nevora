CREATE TABLE `account_roles` (
	`user_email` varchar(320) NOT NULL,
	`role` varchar(32) NOT NULL,
	`created_at` datetime(3) NOT NULL,
	CONSTRAINT `account_roles_user_role_uidx` UNIQUE(`user_email`,`role`)
);
--> statement-breakpoint
CREATE TABLE `admin_audit_logs` (
	`id` varchar(36) NOT NULL,
	`admin_email` varchar(320) NOT NULL,
	`action` varchar(120) NOT NULL,
	`target_type` varchar(80) NOT NULL DEFAULT '',
	`target_id` varchar(120) NOT NULL DEFAULT '',
	`details` text,
	`created_at` datetime(3) NOT NULL,
	CONSTRAINT `admin_audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `admin_users` (
	`email` varchar(320) NOT NULL,
	`auth_user_id` varchar(64) NOT NULL,
	`full_name` varchar(160) NOT NULL,
	`role` varchar(32) NOT NULL DEFAULT 'super_admin',
	`status` varchar(24) NOT NULL DEFAULT 'active',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `admin_users_email` PRIMARY KEY(`email`)
);
--> statement-breakpoint
CREATE TABLE `advertiser_campaigns` (
	`id` varchar(36) NOT NULL,
	`owner_email` varchar(320) NOT NULL,
	`name` varchar(120) NOT NULL,
	`objective` varchar(24) NOT NULL,
	`budget_idr` int NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'Draft',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `advertiser_campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `advertiser_profiles` (
	`owner_email` varchar(320) NOT NULL,
	`full_name` varchar(120) NOT NULL,
	`business_name` varchar(160) NOT NULL,
	`phone` varchar(24) NOT NULL,
	`role` varchar(32) NOT NULL,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `advertiser_profiles_owner_email` PRIMARY KEY(`owner_email`)
);
--> statement-breakpoint
CREATE TABLE `advertiser_wallets` (
	`owner_email` varchar(320) NOT NULL,
	`balance_idr` int NOT NULL DEFAULT 0,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `advertiser_wallets_owner_email` PRIMARY KEY(`owner_email`)
);
--> statement-breakpoint
CREATE TABLE `campaign_daily_performance` (
	`id` varchar(36) NOT NULL,
	`owner_email` varchar(320) NOT NULL,
	`campaign_id` varchar(36) NOT NULL,
	`report_date` varchar(10) NOT NULL,
	`clicks` int NOT NULL DEFAULT 0,
	`conversions` int NOT NULL DEFAULT 0,
	`spend_idr` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `campaign_daily_performance_id` PRIMARY KEY(`id`),
	CONSTRAINT `campaign_daily_performance_owner_campaign_day_uidx` UNIQUE(`owner_email`,`campaign_id`,`report_date`)
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` varchar(36) NOT NULL,
	`advertiser_email` varchar(320) NOT NULL,
	`product_id` varchar(36),
	`name` varchar(160) NOT NULL,
	`payout_idr` int NOT NULL DEFAULT 0,
	`status` varchar(32) NOT NULL DEFAULT 'Draft',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `platform_settings` (
	`setting_key` varchar(120) NOT NULL,
	`setting_value` text NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `platform_settings_setting_key` PRIMARY KEY(`setting_key`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(36) NOT NULL,
	`advertiser_email` varchar(320) NOT NULL,
	`name` varchar(160) NOT NULL,
	`website_url` varchar(2048) NOT NULL DEFAULT '',
	`category` varchar(100) NOT NULL DEFAULT '',
	`status` varchar(32) NOT NULL DEFAULT 'Draft',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `publisher_campaigns` (
	`id` varchar(36) NOT NULL,
	`publisher_email` varchar(320) NOT NULL,
	`campaign_id` varchar(36) NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'Pending',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `publisher_campaigns_id` PRIMARY KEY(`id`),
	CONSTRAINT `publisher_campaigns_publisher_campaign_uidx` UNIQUE(`publisher_email`,`campaign_id`)
);
--> statement-breakpoint
CREATE TABLE `publisher_channels` (
	`id` varchar(36) NOT NULL,
	`owner_email` varchar(320) NOT NULL,
	`name` varchar(160) NOT NULL,
	`type` varchar(40) NOT NULL,
	`url` varchar(2048) NOT NULL DEFAULT '',
	`status` varchar(32) NOT NULL DEFAULT 'Pending',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `publisher_channels_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `publisher_earnings` (
	`id` varchar(36) NOT NULL,
	`publisher_email` varchar(320) NOT NULL,
	`campaign_id` varchar(36) NOT NULL,
	`amount_idr` int NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'Pending',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `publisher_earnings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `publisher_profiles` (
	`owner_email` varchar(320) NOT NULL,
	`full_name` varchar(120) NOT NULL,
	`phone` varchar(24) NOT NULL DEFAULT '',
	`status` varchar(32) NOT NULL DEFAULT 'Pending',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `publisher_profiles_owner_email` PRIMARY KEY(`owner_email`)
);
--> statement-breakpoint
CREATE TABLE `publisher_withdrawals` (
	`id` varchar(36) NOT NULL,
	`publisher_email` varchar(320) NOT NULL,
	`amount_idr` int NOT NULL,
	`status` varchar(32) NOT NULL DEFAULT 'Pending',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `publisher_withdrawals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_installations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`version` varchar(40) NOT NULL,
	`admin_email` varchar(320) NOT NULL,
	`created_at` datetime(3) NOT NULL,
	CONSTRAINT `system_installations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`email` varchar(320) NOT NULL,
	`full_name` varchar(160) NOT NULL,
	`status` varchar(24) NOT NULL DEFAULT 'active',
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `users_email` PRIMARY KEY(`email`)
);
--> statement-breakpoint
CREATE INDEX `account_roles_role_idx` ON `account_roles` (`role`);--> statement-breakpoint
CREATE INDEX `admin_audit_logs_admin_created_idx` ON `admin_audit_logs` (`admin_email`,`created_at`);--> statement-breakpoint
CREATE INDEX `advertiser_campaigns_owner_created_idx` ON `advertiser_campaigns` (`owner_email`,`created_at`);--> statement-breakpoint
CREATE INDEX `campaign_daily_performance_owner_date_idx` ON `campaign_daily_performance` (`owner_email`,`report_date`);--> statement-breakpoint
CREATE INDEX `offers_advertiser_idx` ON `offers` (`advertiser_email`);--> statement-breakpoint
CREATE INDEX `offers_product_idx` ON `offers` (`product_id`);--> statement-breakpoint
CREATE INDEX `products_advertiser_idx` ON `products` (`advertiser_email`);--> statement-breakpoint
CREATE INDEX `publisher_campaigns_campaign_idx` ON `publisher_campaigns` (`campaign_id`);--> statement-breakpoint
CREATE INDEX `publisher_channels_owner_idx` ON `publisher_channels` (`owner_email`);--> statement-breakpoint
CREATE INDEX `publisher_earnings_owner_created_idx` ON `publisher_earnings` (`publisher_email`,`created_at`);--> statement-breakpoint
CREATE INDEX `publisher_withdrawals_owner_created_idx` ON `publisher_withdrawals` (`publisher_email`,`created_at`);--> statement-breakpoint
CREATE INDEX `users_status_idx` ON `users` (`status`);