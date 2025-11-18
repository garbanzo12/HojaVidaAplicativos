-- CreateTable
CREATE TABLE `aplicativo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `direccion_ip` VARCHAR(191) NOT NULL,
    `puerto` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `tipo_red` VARCHAR(191) NOT NULL,
    `escalamiento` VARCHAR(191) NOT NULL,
    `estado` ENUM('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO',
    `tipo_aplicativo` ENUM('internet', 'abai', 'proveedor') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campana` (
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
    `aplicativoId` INTEGER NULL,
    `matrizId` INTEGER NULL,

    INDEX `campana_aplicativoId_idx`(`aplicativoId`),
    INDEX `campana_matrizId_idx`(`matrizId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matrizescalamiento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proveedor` VARCHAR(191) NOT NULL,
    `codigo_servicio` VARCHAR(191) NOT NULL,
    `n_telefono_proveedor` VARCHAR(191) NOT NULL,
    `n_telefono_asesor` VARCHAR(191) NOT NULL,
    `estado` ENUM('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `matrizescalamientoglobal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proveedor` VARCHAR(191) NOT NULL,
    `codigo_servicio` VARCHAR(191) NOT NULL,
    `n_telefono_proveedor` VARCHAR(191) NOT NULL,
    `n_telefono_asesor` VARCHAR(191) NOT NULL,
    `estado` ENUM('HABILITADO', 'DESHABILITADO') NOT NULL DEFAULT 'HABILITADO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CampanaMatrizGlobal` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CampanaMatrizGlobal_AB_unique`(`A`, `B`),
    INDEX `_CampanaMatrizGlobal_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campana` ADD CONSTRAINT `campana_aplicativoId_fkey` FOREIGN KEY (`aplicativoId`) REFERENCES `aplicativo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campana` ADD CONSTRAINT `campana_matrizId_fkey` FOREIGN KEY (`matrizId`) REFERENCES `matrizescalamiento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CampanaMatrizGlobal` ADD CONSTRAINT `_CampanaMatrizGlobal_A_fkey` FOREIGN KEY (`A`) REFERENCES `campana`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CampanaMatrizGlobal` ADD CONSTRAINT `_CampanaMatrizGlobal_B_fkey` FOREIGN KEY (`B`) REFERENCES `matrizescalamientoglobal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
