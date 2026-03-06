CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`price` real NOT NULL,
	`category` text NOT NULL,
	`brand` text NOT NULL,
	`stock` integer DEFAULT 0 NOT NULL,
	`discount` real DEFAULT 0 NOT NULL,
	`images` text DEFAULT '[]' NOT NULL,
	`rating` real DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT (datetime('now')) NOT NULL,
	`updated_at` text DEFAULT (datetime('now')) NOT NULL
);
