-- DropForeignKey
ALTER TABLE `aplicativo` DROP FOREIGN KEY `aplicativo_campanaId_fkey`;

-- DropIndex
DROP INDEX `aplicativo_campanaId_fkey` ON `aplicativo`;

-- CreateTable
CREATE TABLE `_AplicativosCampanas` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AplicativosCampanas_AB_unique`(`A`, `B`),
    INDEX `_AplicativosCampanas_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AplicativosCampanas` ADD CONSTRAINT `_AplicativosCampanas_A_fkey` FOREIGN KEY (`A`) REFERENCES `aplicativo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AplicativosCampanas` ADD CONSTRAINT `_AplicativosCampanas_B_fkey` FOREIGN KEY (`B`) REFERENCES `campana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
