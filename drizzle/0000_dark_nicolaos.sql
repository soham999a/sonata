CREATE TABLE `concept_names` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`conceptId` int NOT NULL,
	`name` varchar(512) NOT NULL,
	`normalizedName` varchar(512) NOT NULL,
	`nameType` enum('canonical','original_language','native_script','transliteration','alternate','historical') NOT NULL,
	`language` varchar(128),
	`script` varchar(64),
	`isPreferred` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `concept_names_id` PRIMARY KEY(`id`),
	CONSTRAINT `concept_names_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `concept_relationships` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`sourceConceptId` int NOT NULL,
	`targetConceptId` int NOT NULL,
	`relationshipType` enum('related_to','part_of','type_of','subtype_of','originated_in','used_in','influenced','influenced_by','contrasts_with','synonym_of','variant_of','performed_with','associated_with','developed_from','predecessor_of','successor_of') NOT NULL,
	`contextNote` longtext,
	`confidenceScore` int NOT NULL DEFAULT 0,
	`sourceCount` int NOT NULL DEFAULT 0,
	`editorialStatus` enum('draft','machine_generated','machine_reviewed','expert_reviewed','published','deprecated') NOT NULL DEFAULT 'draft',
	`createdByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `concept_relationships_id` PRIMARY KEY(`id`),
	CONSTRAINT `relationships_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `relationships_source_target_type_unique` UNIQUE(`sourceConceptId`,`targetConceptId`,`relationshipType`)
);
--> statement-breakpoint
CREATE TABLE `concept_revisions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`conceptId` int NOT NULL,
	`version` int NOT NULL,
	`changedByUserId` int,
	`changeReason` longtext NOT NULL,
	`previousValue` json,
	`newValue` json NOT NULL,
	`changedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `concept_revisions_id` PRIMARY KEY(`id`),
	CONSTRAINT `concept_revisions_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `concept_revisions_version_unique` UNIQUE(`conceptId`,`version`)
);
--> statement-breakpoint
CREATE TABLE `concept_sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`conceptId` int NOT NULL,
	`sourceId` int NOT NULL,
	`claimScope` enum('definition','history','practice','classification','relationship','other') NOT NULL,
	`sourceLocator` varchar(1024),
	`confidenceScore` int NOT NULL DEFAULT 0,
	`editorialNote` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `concept_sources_id` PRIMARY KEY(`id`),
	CONSTRAINT `concept_sources_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `concept_taxonomy` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`conceptId` int NOT NULL,
	`taxonomyNodeId` int NOT NULL,
	`relevanceWeight` int NOT NULL DEFAULT 100,
	`contextNote` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `concept_taxonomy_id` PRIMARY KEY(`id`),
	CONSTRAINT `concept_taxonomy_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `concept_taxonomy_unique` UNIQUE(`conceptId`,`taxonomyNodeId`)
);
--> statement-breakpoint
CREATE TABLE `concepts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`entityType` enum('term','instrument','form','genre','person','place','work','organization','conceptual_collection') NOT NULL,
	`canonicalName` varchar(512) NOT NULL,
	`shortDefinition` text,
	`definition` longtext,
	`historicalContext` longtext,
	`practicalUsage` longtext,
	`visualAudioDescription` longtext,
	`originRegion` varchar(255),
	`tradition` varchar(255),
	`culture` varchar(255),
	`genre` varchar(255),
	`category` varchar(255),
	`subCategory` varchar(255),
	`era` varchar(255),
	`period` varchar(255),
	`languageOfOrigin` varchar(128),
	`transliteration` varchar(512),
	`pronunciation` varchar(255),
	`partOfSpeech` varchar(128),
	`confidenceScore` int NOT NULL DEFAULT 0,
	`sourceCount` int NOT NULL DEFAULT 0,
	`sourceQuality` enum('unassessed','mixed','strong','primary') NOT NULL DEFAULT 'unassessed',
	`reviewNotes` longtext,
	`editorialStatus` enum('draft','machine_generated','machine_reviewed','expert_reviewed','published','deprecated') NOT NULL DEFAULT 'draft',
	`createdByUserId` int,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `concepts_id` PRIMARY KEY(`id`),
	CONSTRAINT `concepts_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `concepts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `editorial_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`conceptId` int NOT NULL,
	`reviewerUserId` int,
	`fromStatus` enum('draft','machine_generated','machine_reviewed','expert_reviewed','published','deprecated'),
	`toStatus` enum('draft','machine_generated','machine_reviewed','expert_reviewed','published','deprecated') NOT NULL,
	`confidenceScore` int NOT NULL DEFAULT 0,
	`reviewNotes` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `editorial_reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `editorial_reviews_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `import_rows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`importId` int NOT NULL,
	`rowNumber` int NOT NULL,
	`payload` json NOT NULL,
	`normalizedPayload` json,
	`validationState` enum('valid','warning','error') NOT NULL DEFAULT 'valid',
	`validationMessages` json,
	`proposedConceptId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `import_rows_id` PRIMARY KEY(`id`),
	CONSTRAINT `import_rows_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `import_rows_number_unique` UNIQUE(`importId`,`rowNumber`)
);
--> statement-breakpoint
CREATE TABLE `imports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`fileName` varchar(1024) NOT NULL,
	`fileKey` varchar(2048),
	`fileFormat` enum('csv','json','jsonl','xlsx') NOT NULL,
	`status` enum('staged','validating','needs_review','approved','rejected','published') NOT NULL DEFAULT 'staged',
	`submittedByUserId` int,
	`report` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `imports_id` PRIMARY KEY(`id`),
	CONSTRAINT `imports_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `quality_issues` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`conceptId` int,
	`importRowId` int,
	`issueType` enum('duplicate','orphan','broken_reference','circular_relationship','missing_definition','transliteration','unsupported_claim','taxonomy_review') NOT NULL,
	`severity` enum('low','medium','high','blocking') NOT NULL,
	`status` enum('open','in_review','resolved','dismissed') NOT NULL DEFAULT 'open',
	`detail` longtext NOT NULL,
	`metadata` json,
	`resolvedByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quality_issues_id` PRIMARY KEY(`id`),
	CONSTRAINT `quality_issues_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `search_documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`conceptId` int NOT NULL,
	`normalizedName` varchar(512) NOT NULL,
	`alternateNames` longtext,
	`searchableText` longtext NOT NULL,
	`filterPayload` json,
	`indexedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `search_documents_id` PRIMARY KEY(`id`),
	CONSTRAINT `search_documents_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `search_documents_concept_unique` UNIQUE(`conceptId`)
);
--> statement-breakpoint
CREATE TABLE `sources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`sourceType` enum('book','article','archive','recording','institution','oral_history','other') NOT NULL,
	`citation` longtext NOT NULL,
	`locator` varchar(1024),
	`uri` varchar(2048),
	`publisher` varchar(512),
	`publicationYear` int,
	`language` varchar(128),
	`sourceQuality` enum('unassessed','mixed','strong','primary') NOT NULL DEFAULT 'unassessed',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sources_id` PRIMARY KEY(`id`),
	CONSTRAINT `sources_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `taxonomy_nodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`label` varchar(255) NOT NULL,
	`nodeType` enum('world_region','region','culture','tradition','genre','era','category','instrument','technique','theory','form','rhythm','melody','harmony','tuning','notation','performance','technology') NOT NULL,
	`parentNodeId` int,
	`pathKey` varchar(1024) NOT NULL,
	`culturalScope` longtext,
	`editorialNote` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `taxonomy_nodes_id` PRIMARY KEY(`id`),
	CONSTRAINT `taxonomy_nodes_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `taxonomy_nodes_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
ALTER TABLE `concept_names` ADD CONSTRAINT `concept_names_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_relationships` ADD CONSTRAINT `concept_relationships_sourceConceptId_concepts_id_fk` FOREIGN KEY (`sourceConceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_relationships` ADD CONSTRAINT `concept_relationships_targetConceptId_concepts_id_fk` FOREIGN KEY (`targetConceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_relationships` ADD CONSTRAINT `concept_relationships_createdByUserId_users_id_fk` FOREIGN KEY (`createdByUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_revisions` ADD CONSTRAINT `concept_revisions_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_revisions` ADD CONSTRAINT `concept_revisions_changedByUserId_users_id_fk` FOREIGN KEY (`changedByUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_sources` ADD CONSTRAINT `concept_sources_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_sources` ADD CONSTRAINT `concept_sources_sourceId_sources_id_fk` FOREIGN KEY (`sourceId`) REFERENCES `sources`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_taxonomy` ADD CONSTRAINT `concept_taxonomy_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concept_taxonomy` ADD CONSTRAINT `concept_taxonomy_taxonomyNodeId_taxonomy_nodes_id_fk` FOREIGN KEY (`taxonomyNodeId`) REFERENCES `taxonomy_nodes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `concepts` ADD CONSTRAINT `concepts_createdByUserId_users_id_fk` FOREIGN KEY (`createdByUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `editorial_reviews` ADD CONSTRAINT `editorial_reviews_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `editorial_reviews` ADD CONSTRAINT `editorial_reviews_reviewerUserId_users_id_fk` FOREIGN KEY (`reviewerUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `import_rows` ADD CONSTRAINT `import_rows_importId_imports_id_fk` FOREIGN KEY (`importId`) REFERENCES `imports`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `import_rows` ADD CONSTRAINT `import_rows_proposedConceptId_concepts_id_fk` FOREIGN KEY (`proposedConceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `imports` ADD CONSTRAINT `imports_submittedByUserId_users_id_fk` FOREIGN KEY (`submittedByUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quality_issues` ADD CONSTRAINT `quality_issues_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quality_issues` ADD CONSTRAINT `quality_issues_importRowId_import_rows_id_fk` FOREIGN KEY (`importRowId`) REFERENCES `import_rows`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quality_issues` ADD CONSTRAINT `quality_issues_resolvedByUserId_users_id_fk` FOREIGN KEY (`resolvedByUserId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `search_documents` ADD CONSTRAINT `search_documents_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `concept_names_concept_idx` ON `concept_names` (`conceptId`);--> statement-breakpoint
CREATE INDEX `concept_names_normalized_idx` ON `concept_names` (`normalizedName`);--> statement-breakpoint
CREATE INDEX `relationships_source_idx` ON `concept_relationships` (`sourceConceptId`);--> statement-breakpoint
CREATE INDEX `relationships_target_idx` ON `concept_relationships` (`targetConceptId`);--> statement-breakpoint
CREATE INDEX `concept_sources_concept_idx` ON `concept_sources` (`conceptId`);--> statement-breakpoint
CREATE INDEX `concept_taxonomy_node_idx` ON `concept_taxonomy` (`taxonomyNodeId`);--> statement-breakpoint
CREATE INDEX `concepts_status_type_idx` ON `concepts` (`editorialStatus`,`entityType`);--> statement-breakpoint
CREATE INDEX `concepts_name_idx` ON `concepts` (`canonicalName`);--> statement-breakpoint
CREATE INDEX `editorial_reviews_concept_idx` ON `editorial_reviews` (`conceptId`);--> statement-breakpoint
CREATE INDEX `quality_issues_status_idx` ON `quality_issues` (`status`,`severity`);--> statement-breakpoint
CREATE INDEX `search_documents_name_idx` ON `search_documents` (`normalizedName`);--> statement-breakpoint
CREATE INDEX `taxonomy_parent_idx` ON `taxonomy_nodes` (`parentNodeId`);--> statement-breakpoint
CREATE INDEX `taxonomy_path_idx` ON `taxonomy_nodes` (`pathKey`);