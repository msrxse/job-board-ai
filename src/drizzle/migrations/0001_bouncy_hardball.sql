CREATE TYPE "public"."user_account_type" AS ENUM('user', 'organization');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "type" "user_account_type" DEFAULT 'user' NOT NULL;