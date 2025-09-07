-- CreateTable
CREATE TABLE `tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `icon` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `type` ENUM('BLOG', 'PERSON') NOT NULL DEFAULT 'BLOG',
    `sort` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `uk_name_type`(`name`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
