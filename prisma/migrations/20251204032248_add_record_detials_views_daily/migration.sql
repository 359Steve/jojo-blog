-- CreateTable
CREATE TABLE `record_details_views_daily` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `record_detail_id` INTEGER NOT NULL,
    `view_date` DATETIME(3) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,

    INDEX `record_details_views_daily_record_detail_id_fkey`(`record_detail_id`),
    UNIQUE INDEX `record_details_views_daily_record_detail_id_view_date_key`(`record_detail_id`, `view_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
