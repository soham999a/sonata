CREATE TABLE `coverage_targets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`dimension` varchar(32) NOT NULL,
	`slug` varchar(160) NOT NULL,
	`label` varchar(255) NOT NULL,
	`targetCount` int NOT NULL,
	`publishedCount` int NOT NULL DEFAULT 0,
	`draftCount` int NOT NULL DEFAULT 0,
	`detail` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coverage_targets_id` PRIMARY KEY(`id`),
	CONSTRAINT `coverage_targets_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `coverage_targets_dimension_slug_unique` UNIQUE(`dimension`,`slug`)
);
--> statement-breakpoint
CREATE TABLE `definition_variants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`conceptId` int NOT NULL,
	`sourceId` int,
	`definition` longtext NOT NULL,
	`regionalContext` longtext,
	`historicalContext` longtext,
	`editorialNote` longtext,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `definition_variants_id` PRIMARY KEY(`id`),
	CONSTRAINT `definition_variants_public_id_unique` UNIQUE(`publicId`)
);
--> statement-breakpoint
CREATE TABLE `import_batch_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`publicId` varchar(36) NOT NULL,
	`importId` int NOT NULL,
	`acceptedConcepts` int NOT NULL DEFAULT 0,
	`duplicatesRemoved` int NOT NULL DEFAULT 0,
	`relationshipsCreated` int NOT NULL DEFAULT 0,
	`lowConfidenceConcepts` int NOT NULL DEFAULT 0,
	`sourceConflicts` int NOT NULL DEFAULT 0,
	`regionalDistribution` json,
	`categoryDistribution` json,
	`eraDistribution` json,
	`qualitySummary` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `import_batch_metrics_id` PRIMARY KEY(`id`),
	CONSTRAINT `import_batch_metrics_public_id_unique` UNIQUE(`publicId`),
	CONSTRAINT `import_batch_metrics_import_unique` UNIQUE(`importId`)
);
--> statement-breakpoint
ALTER TABLE `concepts` ADD `emicDescription` longtext;--> statement-breakpoint
ALTER TABLE `concepts` ADD `eticComparison` longtext;--> statement-breakpoint
ALTER TABLE `concepts` ADD `regionalVariation` longtext;--> statement-breakpoint
ALTER TABLE `concepts` ADD `diasporaContext` longtext;--> statement-breakpoint
ALTER TABLE `concepts` ADD `uncertaintyNote` longtext;--> statement-breakpoint
ALTER TABLE `concepts` ADD `sourceConfidence` varchar(16) DEFAULT 'low' NOT NULL;--> statement-breakpoint
ALTER TABLE `import_rows` ADD `normalizedName` varchar(512);--> statement-breakpoint
ALTER TABLE `import_rows` ADD `duplicateRisk` varchar(16) DEFAULT 'none' NOT NULL;--> statement-breakpoint
ALTER TABLE `import_rows` ADD `sourceConfidence` varchar(16) DEFAULT 'low' NOT NULL;--> statement-breakpoint
ALTER TABLE `import_rows` ADD `requiresSpecialistReview` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `import_rows` ADD `publicationAllowed` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `imports` ADD `sourceProvider` varchar(512);--> statement-breakpoint
ALTER TABLE `imports` ADD `candidateCount` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `definition_variants` ADD CONSTRAINT `definition_variants_conceptId_concepts_id_fk` FOREIGN KEY (`conceptId`) REFERENCES `concepts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `definition_variants` ADD CONSTRAINT `definition_variants_sourceId_sources_id_fk` FOREIGN KEY (`sourceId`) REFERENCES `sources`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `import_batch_metrics` ADD CONSTRAINT `import_batch_metrics_importId_imports_id_fk` FOREIGN KEY (`importId`) REFERENCES `imports`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `coverage_targets_dimension_idx` ON `coverage_targets` (`dimension`);--> statement-breakpoint
CREATE INDEX `definition_variants_concept_idx` ON `definition_variants` (`conceptId`);