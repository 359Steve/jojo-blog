/*
  Warnings:

  - You are about to drop the column `image_url` on the `record_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `record_details` DROP COLUMN `image_url`;

-- CreateTable
CREATE TABLE `record_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `record_detail_id` INTEGER NOT NULL,
    `url` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `record_images` ADD CONSTRAINT `record_images_record_detail_id_fkey` FOREIGN KEY (`record_detail_id`) REFERENCES `record_details`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
