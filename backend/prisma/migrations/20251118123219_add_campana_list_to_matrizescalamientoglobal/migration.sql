/*
  Warnings:

  - You are about to drop the column `campanaId` on the `matrizescalamientoglobal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `matrizescalamientoglobal` DROP FOREIGN KEY `MatrizEscalamientoGlobal_campanaId_fkey`;

-- DropIndex
DROP INDEX `MatrizEscalamientoGlobal_campanaId_fkey` ON `matrizescalamientoglobal`;

-- AlterTable
ALTER TABLE `matrizescalamiento` MODIFY `campanaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `matrizescalamientoglobal` DROP COLUMN `campanaId`;

-- CreateTable
CREATE TABLE `_campanaTomatrizescalamientoglobal` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_campanaTomatrizescalamientoglobal_AB_unique`(`A`, `B`),
    INDEX `_campanaTomatrizescalamientoglobal_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_campanaTomatrizescalamientoglobal` ADD CONSTRAINT `_campanaTomatrizescalamientoglobal_A_fkey` FOREIGN KEY (`A`) REFERENCES `campana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_campanaTomatrizescalamientoglobal` ADD CONSTRAINT `_campanaTomatrizescalamientoglobal_B_fkey` FOREIGN KEY (`B`) REFERENCES `matrizescalamientoglobal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
