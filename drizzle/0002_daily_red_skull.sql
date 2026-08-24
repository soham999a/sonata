CREATE TABLE `assistant_audits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`userId` int,
	`question` longtext NOT NULL,
	`answer` longtext NOT NULL,
	`retrievedConceptIds` json NOT NULL,
	`citedSourceIds` json NOT NULL,
	`answerStatus` enum('grounded','insufficient_evidence','blocked') NOT NULL,
	`model` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `assistant_audits_id` PRIMARY KEY(`id`),
	CONSTRAINT `assistant_audits_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `contribution_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`submitterUserId` int NOT NULL,
	`targetConceptId` int,
	`kind` enum('edit','new_term','error','source','relationship') NOT NULL,
	`summary` varchar(512) NOT NULL,
	`detail` longtext NOT NULL,
	`sourceUrl` varchar(2048),
	`status` enum('submitted','in_review','accepted','declined') NOT NULL DEFAULT 'submitted',
	`reviewerUserId` int,
	`reviewerNote` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contribution_submissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `contribution_submissions_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `learning_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`userId` int NOT NULL,
	`conceptId` int NOT NULL,
	`activityType` enum('learning_path','flashcard','quiz') NOT NULL,
	`status` enum('not_started','in_progress','completed') NOT NULL DEFAULT 'not_started',
	`masteryScore` int NOT NULL DEFAULT 0,
	`attempts` int NOT NULL DEFAULT 0,
	`lastActivityAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learning_progress_id` PRIMARY KEY(`id`),
	CONSTRAINT `learning_progress_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `learning_progress_user_concept_activity_unique` UNIQUE(`userId`,`conceptId`,`activityType`)
);
--> statement-breakpoint
ALTER TABLE `assistant_audits` ADD CONSTRAINT `assistant_audits_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contribution_submissions` ADD CONSTRAINT `contribution_submissions_submitterUserId_users_id_fk` FOREIGN KEY (`submitterUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contribution_submissions` ADD CONSTRAINT `contribution_submissions_targetConceptId_concepts_id_fk` FOREIGN KEY (`targetConceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contribution_submissions` ADD CONSTRAINT `contribution_submissions_reviewerUserId_users_id_fk` FOREIGN KEY (`reviewerUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learning_progress` ADD CONSTRAINT `learning_progress_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learning_progress` ADD CONSTRAINT `learning_progress_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `assistant_audits_status_created_idx` ON `assistant_audits` (`answerStatus`,`createdAt`);--> statement-breakpoint
CREATE INDEX `assistant_audits_user_idx` ON `assistant_audits` (`userId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `contribution_submissions_status_idx` ON `contribution_submissions` (`status`,`createdAt`);--> statement-breakpoint
CREATE INDEX `contribution_submissions_target_idx` ON `contribution_submissions` (`targetConceptId`);--> statement-breakpoint
CREATE INDEX `learning_progress_user_idx` ON `learning_progress` (`userId`,`updatedAt`);--> statement-breakpoint
CREATE INDEX `concepts_public_filter_idx` ON `concepts` (`editorialStatus`,`originRegion`,`tradition`,`era`);