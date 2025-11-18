/*
  Warnings:

  - You are about to alter the column `user_name` on the `user_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `password` on the `user_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `pet_name` on the `user_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - Added the required column `front_cover` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blog_tag` DROP FOREIGN KEY `blog_tag_blog_id_fkey`;

-- AlterTable
ALTER TABLE `blog` ADD COLUMN `date_path` VARCHAR(255) NOT NULL DEFAULT '1997-01-01-103523',
    ADD COLUMN `front_cover` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `tag` ADD COLUMN `color` VARCHAR(20) NOT NULL DEFAULT '#000000';

-- AlterTable
ALTER TABLE `user_info` MODIFY `user_name` VARCHAR(10) NOT NULL,
    MODIFY `password` VARCHAR(20) NOT NULL,
    MODIFY `avatar_url` VARCHAR(255) NOT NULL,
    MODIFY `pet_name` VARCHAR(20) NOT NULL,
    MODIFY `describe` TEXT NOT NULL,
    MODIFY `sign` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `user_tag` (
    `user_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    INDEX `user_tag_tag_id_fkey`(`tag_id`),
    PRIMARY KEY (`user_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `record_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time_range` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL,
    `summary` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `record_groups_time_range_key`(`time_range`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `record_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `summary` TEXT NOT NULL,
    `time_range` VARCHAR(20) NOT NULL,
    `image_url` VARCHAR(500) NOT NULL,
    `image_alt` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `record_details_group_id_fkey`(`group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blog_tag` ADD CONSTRAINT `blog_tag_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_tag` ADD CONSTRAINT `user_tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_tag` ADD CONSTRAINT `user_tag_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `record_details` ADD CONSTRAINT `record_details_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `record_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
