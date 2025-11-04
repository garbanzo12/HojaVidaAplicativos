-- CreateTable
CREATE TABLE `Campana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_campana` VARCHAR(191) NOT NULL,
    `cliente` VARCHAR(191) NOT NULL,
    `director_operacion_abai` VARCHAR(191) NOT NULL,
    `correo_director` VARCHAR(191) NOT NULL,
    `segmento` VARCHAR(191) NULL,
    `nombre_gte_campana` VARCHAR(191) NULL,
    `correo_gte_campana` VARCHAR(191) NULL,
    `ubicacion_sedes` VARCHAR(191) NOT NULL,
    `puestos_operacion` INTEGER NOT NULL,
    `puestos_estructura` INTEGER NOT NULL,
    `segmento_red` VARCHAR(191) NOT NULL,
    `fecha_actualizacion` DATETIME(3) NOT NULL,
    `nombre_contacto_cliente` VARCHAR(191) NOT NULL,
    `correo_contacto_cliente` VARCHAR(191) NOT NULL,
    `telefono_contacto_cliente` VARCHAR(191) NOT NULL,
    `nombre_contacto_comercial` VARCHAR(191) NOT NULL,
    `correo_contacto_comercial` VARCHAR(191) NOT NULL,
    `telefono_contacto_comercial` VARCHAR(191) NOT NULL,
    `soporte_tecnico_abai` VARCHAR(191) NOT NULL,
    `correo_soporte_abai` VARCHAR(191) NOT NULL,
    `servicios_prestados` VARCHAR(191) NULL,
    `imagen_cliente` VARCHAR(191) NULL,
    `imagen_sede` VARCHAR(191) NULL,
    `estado` ENUM('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aplicativo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `direccion_ip` VARCHAR(191) NOT NULL,
    `puerto` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo_red` ENUM('internet', 'abai', 'proveedor') NOT NULL,
    `escalamiento` VARCHAR(191) NOT NULL,
    `campanaId` INTEGER NOT NULL,
    `estado` ENUM('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatrizEscalamiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proveedor` VARCHAR(191) NOT NULL,
    `codigo_servicio` VARCHAR(191) NOT NULL,
    `n_telefono_proveedor` VARCHAR(191) NOT NULL,
    `n_telefono_asesor` VARCHAR(191) NOT NULL,
    `campanaId` INTEGER NOT NULL,
    `estado` ENUM('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatrizEscalamientoGlobal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proveedor` VARCHAR(191) NOT NULL,
    `codigo_servicio` VARCHAR(191) NOT NULL,
    `n_telefono_proveedor` VARCHAR(191) NOT NULL,
    `n_telefono_asesor` VARCHAR(191) NOT NULL,
    `campanaId` INTEGER NOT NULL,
    `estado` ENUM('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aplicativo` ADD CONSTRAINT `Aplicativo_campanaId_fkey` FOREIGN KEY (`campanaId`) REFERENCES `Campana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatrizEscalamiento` ADD CONSTRAINT `MatrizEscalamiento_campanaId_fkey` FOREIGN KEY (`campanaId`) REFERENCES `Campana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatrizEscalamientoGlobal` ADD CONSTRAINT `MatrizEscalamientoGlobal_campanaId_fkey` FOREIGN KEY (`campanaId`) REFERENCES `Campana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
