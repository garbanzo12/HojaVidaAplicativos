/*
  Warnings:

  - You are about to drop the column `campanaId` on the `usuario` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `usuario_campanaId_fkey`;

-- DropIndex
DROP INDEX `usuario_campanaId_fkey` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `campanaId`;

-- CreateTable
CREATE TABLE `_UsuariosCampanas` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UsuariosCampanas_AB_unique`(`A`, `B`),
    INDEX `_UsuariosCampanas_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UsuariosCampanas` ADD CONSTRAINT `_UsuariosCampanas_A_fkey` FOREIGN KEY (`A`) REFERENCES `campana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UsuariosCampanas` ADD CONSTRAINT `_UsuariosCampanas_B_fkey` FOREIGN KEY (`B`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
