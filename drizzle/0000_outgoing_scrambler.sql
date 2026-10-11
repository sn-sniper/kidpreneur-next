CREATE TABLE `activity_states` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`activityId` text NOT NULL,
	`data` text NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `activity_states_userId_activityId_unique` ON `activity_states` (`userId`,`activityId`);--> statement-breakpoint
CREATE TABLE `activity_submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`sessionNumber` integer NOT NULL,
	`activityType` text NOT NULL,
	`payload` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `course_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`sessionNumber` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`objective` text NOT NULL,
	`icon` text NOT NULL,
	`activityType` text NOT NULL,
	`activityPayload` text NOT NULL,
	`unlockCode` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `course_sessions_sessionNumber_unique` ON `course_sessions` (`sessionNumber`);--> statement-breakpoint
CREATE TABLE `global_learner_states` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`data` text NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `global_learner_states_userId_unique` ON `global_learner_states` (`userId`);--> statement-breakpoint
CREATE TABLE `lab_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`parentId` text NOT NULL,
	`parentFullName` text NOT NULL,
	`parentPhone` text NOT NULL,
	`parentEmail` text NOT NULL,
	`childFullName` text NOT NULL,
	`childAge` integer NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`generatedEmail` text,
	`generatedPassword` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	`updatedAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`parentId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `portfolio_activities` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`href` text NOT NULL,
	`orderIndex` integer DEFAULT 0 NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	`updatedAt` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`paymentProviderId` text,
	`planId` text NOT NULL,
	`status` text DEFAULT 'ACTIVE' NOT NULL,
	`currentPeriodEnd` integer NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	`updatedAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_paymentProviderId_unique` ON `subscriptions` (`paymentProviderId`);--> statement-breakpoint
CREATE TABLE `user_progress` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`courseSessionId` text,
	`sessionNumber` integer NOT NULL,
	`status` text NOT NULL,
	`notes` text,
	`reflection` text,
	`completedAt` integer,
	`updatedAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`courseSessionId`) REFERENCES `course_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_progress_userId_sessionNumber_unique` ON `user_progress` (`userId`,`sessionNumber`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text,
	`passwordHash` text,
	`fullName` text NOT NULL,
	`role` text DEFAULT 'STUDENT' NOT NULL,
	`parentId` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	`updatedAt` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);