/*
Warnings:

- You are about to alter the column `user_name` on the `user_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
- You are about to alter the column `password` on the `user_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
- You are about to alter the column `pet_name` on the `user_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `user_info`
MODIFY `user_name` VARCHAR(10) NOT NULL,
MODIFY `password` VARCHAR(20) NOT NULL,
MODIFY `avatar_url` VARCHAR(255) NOT NULL,
MODIFY `pet_name` VARCHAR(20) NOT NULL,
MODIFY `describe` TEXT NOT NULL,
MODIFY `sign` TEXT NOT NULL;
