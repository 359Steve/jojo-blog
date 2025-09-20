/*
  Warnings:

  - Added the required column `content` to the `blog` table without a default value. This is not possible if the table is not empty.
  - Made the column `subtitle` on table `blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `blog` ADD COLUMN `content` TEXT NOT NULL,
    MODIFY `subtitle` VARCHAR(191) NOT NULL;
