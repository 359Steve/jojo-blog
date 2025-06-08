-- AlterTable
ALTER TABLE `user_info` ADD COLUMN `describe` VARCHAR(191) NOT NULL DEFAULT '暂无描述',
    ADD COLUMN `sign` VARCHAR(191) NOT NULL DEFAULT '这个人很懒，什么都没写';
