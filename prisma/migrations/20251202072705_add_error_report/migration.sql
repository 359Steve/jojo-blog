/*
  Warnings:

  - You are about to drop the column `createdAt` on the `error_report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `error_report` DROP COLUMN `createdAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
