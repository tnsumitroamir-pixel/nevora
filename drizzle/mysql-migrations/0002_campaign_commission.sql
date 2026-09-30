ALTER TABLE `advertiser_campaigns`
  ADD COLUMN `product_id` varchar(36) NOT NULL DEFAULT '' AFTER `budget_idr`,
  ADD COLUMN `payout_idr` int NOT NULL DEFAULT 0 AFTER `product_id`;
--> statement-breakpoint
ALTER TABLE `offers`
  ADD COLUMN `campaign_id` varchar(36) NULL AFTER `advertiser_email`,
  ADD UNIQUE INDEX `offers_campaign_uidx` (`campaign_id`);
