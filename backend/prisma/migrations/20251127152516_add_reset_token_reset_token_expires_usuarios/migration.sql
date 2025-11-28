/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpires` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_correo_key` ON `usuario`(`correo`);
