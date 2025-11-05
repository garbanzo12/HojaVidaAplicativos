/*
  Warnings:

  - You are about to alter the column `tipo_red` on the `aplicativo` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Added the required column `tipo_aplicativo` to the `Aplicativo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aplicativo` ADD COLUMN `tipo_aplicativo` ENUM('internet', 'abai', 'proveedor') NOT NULL,
    MODIFY `tipo_red` VARCHAR(191) NOT NULL;
