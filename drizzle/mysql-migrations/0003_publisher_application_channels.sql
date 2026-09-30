ALTER TABLE `publisher_offer_applications`
  ADD COLUMN `channel_id` varchar(36) NOT NULL DEFAULT '' AFTER `offer_id`,
  ADD INDEX `publisher_offer_applications_channel_idx` (`channel_id`);
--> statement-breakpoint
UPDATE `publisher_offer_applications`
SET `status` = 'Rejected'
WHERE `channel_id` = '' AND `status` <> 'Rejected';
