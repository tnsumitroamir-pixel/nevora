ALTER TABLE `publisher_withdrawals`
  ADD COLUMN `transfer_reference` varchar(160) NOT NULL DEFAULT '',
  ADD COLUMN `paid_at` datetime(3) NULL,
  ADD COLUMN `reviewed_by` varchar(320) NULL;
--> statement-breakpoint
CREATE TABLE `publisher_offer_applications` (
  `id` varchar(36) NOT NULL,
  `publisher_email` varchar(320) NOT NULL,
  `offer_id` varchar(36) NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'Pending',
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  CONSTRAINT `publisher_offer_applications_id` PRIMARY KEY(`id`),
  CONSTRAINT `publisher_offer_applications_uidx` UNIQUE(`publisher_email`,`offer_id`),
  KEY `publisher_offer_applications_offer_status_idx` (`offer_id`,`status`)
);
--> statement-breakpoint
CREATE TABLE `publisher_tracking_links` (
  `id` varchar(36) NOT NULL,
  `publisher_email` varchar(320) NOT NULL,
  `offer_id` varchar(36) NOT NULL,
  `token` varchar(64) NOT NULL,
  `created_at` datetime(3) NOT NULL,
  CONSTRAINT `publisher_tracking_links_id` PRIMARY KEY(`id`),
  CONSTRAINT `publisher_tracking_links_token_uidx` UNIQUE(`token`),
  CONSTRAINT `publisher_tracking_links_owner_offer_uidx` UNIQUE(`publisher_email`,`offer_id`)
);
--> statement-breakpoint
CREATE TABLE `publisher_clicks` (
  `id` varchar(36) NOT NULL,
  `tracking_link_id` varchar(36) NOT NULL,
  `publisher_email` varchar(320) NOT NULL,
  `offer_id` varchar(36) NOT NULL,
  `created_at` datetime(3) NOT NULL,
  CONSTRAINT `publisher_clicks_id` PRIMARY KEY(`id`),
  KEY `publisher_clicks_owner_created_idx` (`publisher_email`,`created_at`),
  KEY `publisher_clicks_offer_created_idx` (`offer_id`,`created_at`)
);
--> statement-breakpoint
CREATE TABLE `publisher_conversions` (
  `id` varchar(36) NOT NULL,
  `click_id` varchar(36) NOT NULL,
  `publisher_email` varchar(320) NOT NULL,
  `offer_id` varchar(36) NOT NULL,
  `advertiser_email` varchar(320) NOT NULL,
  `external_event_id` varchar(160) NOT NULL,
  `payout_idr` int NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'Pending',
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  CONSTRAINT `publisher_conversions_id` PRIMARY KEY(`id`),
  CONSTRAINT `publisher_conversions_advertiser_event_uidx` UNIQUE(`advertiser_email`,`external_event_id`),
  CONSTRAINT `publisher_conversions_click_uidx` UNIQUE(`click_id`),
  KEY `publisher_conversions_owner_created_idx` (`publisher_email`,`created_at`),
  KEY `publisher_conversions_status_created_idx` (`status`,`created_at`)
);
--> statement-breakpoint
CREATE TABLE `publisher_earning_entries` (
  `id` varchar(36) NOT NULL,
  `conversion_id` varchar(36) NOT NULL,
  `publisher_email` varchar(320) NOT NULL,
  `offer_id` varchar(36) NOT NULL,
  `amount_idr` int NOT NULL,
  `created_at` datetime(3) NOT NULL,
  CONSTRAINT `publisher_earning_entries_id` PRIMARY KEY(`id`),
  CONSTRAINT `publisher_earning_entries_conversion_uidx` UNIQUE(`conversion_id`),
  KEY `publisher_earning_entries_owner_created_idx` (`publisher_email`,`created_at`)
);
--> statement-breakpoint
CREATE TABLE `publisher_support_tickets` (
  `id` varchar(36) NOT NULL,
  `publisher_email` varchar(320) NOT NULL,
  `subject` varchar(160) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(24) NOT NULL DEFAULT 'Open',
  `admin_response` varchar(4000) NOT NULL DEFAULT '',
  `reviewed_by` varchar(320),
  `created_at` datetime(3) NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  CONSTRAINT `publisher_support_tickets_id` PRIMARY KEY(`id`),
  KEY `publisher_support_tickets_owner_created_idx` (`publisher_email`,`created_at`),
  KEY `publisher_support_tickets_status_created_idx` (`status`,`created_at`)
);
