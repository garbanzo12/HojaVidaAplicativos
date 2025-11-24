-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_completo` VARCHAR(191) NOT NULL,
    `correo` VARCHAR(191) NOT NULL,
    `tipo_documento` ENUM('DIE', 'PEP', 'CC') NOT NULL,
    `numero_documento` VARCHAR(191) NOT NULL,
    `sede` ENUM('pereira', 'manizales', 'bogota') NOT NULL,
    `rol` ENUM('proveedor', 'administrador') NOT NULL,
    `estado` ENUM('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO',
    `campanaId` INTEGER NULL,

    INDEX `usuario_campanaId_fkey`(`campanaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_campanaId_fkey` FOREIGN KEY (`campanaId`) REFERENCES `campana`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
