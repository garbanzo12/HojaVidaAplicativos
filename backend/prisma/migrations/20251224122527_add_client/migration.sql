-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClientesCampanas` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ClientesCampanas_AB_unique`(`A`, `B`),
    INDEX `_ClientesCampanas_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClientesCampanas` ADD CONSTRAINT `_ClientesCampanas_A_fkey` FOREIGN KEY (`A`) REFERENCES `campana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientesCampanas` ADD CONSTRAINT `_ClientesCampanas_B_fkey` FOREIGN KEY (`B`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
