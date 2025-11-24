/*
  Warnings:

  - Made the column `contrasena` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `contrasena` VARCHAR(191) NOT NULL;
