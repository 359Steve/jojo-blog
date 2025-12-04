-- CreateTable
CREATE TABLE `blog_views_daily` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blog_id` INTEGER NOT NULL,
    `view_date` DATETIME(3) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,

    INDEX `blog_views_daily_blog_id_fkey`(`blog_id`),
    UNIQUE INDEX `blog_views_daily_blog_id_view_date_key`(`blog_id`, `view_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
