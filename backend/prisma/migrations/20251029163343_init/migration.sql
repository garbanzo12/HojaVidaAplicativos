-- CreateTable
CREATE TABLE `Campanas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_campana` VARCHAR(100) NOT NULL,
    `cliente` VARCHAR(100) NOT NULL,
    `director_operacion` VARCHAR(150) NOT NULL,
    `correo_director` VARCHAR(150) NOT NULL,
    `fecha_actualizacion` DATETIME(3) NULL,
    `servicios_prestados` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gestores_campana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `campana_id` INTEGER NULL,
    `segmento` VARCHAR(100) NULL,
    `nombre` VARCHAR(100) NULL,
    `correo` VARCHAR(150) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Datos_generales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `campana_id` INTEGER NULL,
    `ubicacion_sede` VARCHAR(150) NULL,
    `puestos_operacion` INTEGER NULL,
    `puestos_estructura` INTEGER NULL,
    `segmento_red` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contactos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `campana_id` INTEGER NULL,
    `tipo_contacto` ENUM('Cliente', 'Comercial', 'Soporte') NOT NULL,
    `nombre` VARCHAR(150) NULL,
    `correo` VARCHAR(150) NULL,
    `telefono` VARCHAR(50) NULL,
    `empresa` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imagen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagen` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campanas_detalle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `campana_id` INTEGER NOT NULL,
    `gestor_id` INTEGER NULL,
    `datos_generales_id` INTEGER NULL,
    `contacto_id` INTEGER NULL,
    `imagen_id` INTEGER NULL,
    `estado` ENUM('habilitado', 'deshabilitado') NULL

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE Aplicativos_ABAI (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion_ip VARCHAR(50),
    puerto VARCHAR(10),
    url TEXT,
    tipo_red VARCHAR(100),
    escalamiento VARCHAR(100)
);
CREATE TABLE Aplicativos_Proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    puerto VARCHAR(10),
    url TEXT,
    tipo_red VARCHAR(100),
    escalamiento VARCHAR(100)
);

CREATE TABLE Aplicativos_Internet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion_ip VARCHAR(50),
    puerto VARCHAR(10),
    url TEXT,
    tipo_red VARCHAR(100),
    escalamiento VARCHAR(100)
);
CREATE TABLE Matriz_Escalamiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor VARCHAR(100),
    codigo_servicio VARCHAR(50),
    telefono_proveedor VARCHAR(20),
    telefono_asesor VARCHAR(20)
);


-- AddForeignKey
ALTER TABLE `Gestores_campana` ADD CONSTRAINT `Gestores_campana_campana_id_fkey` FOREIGN KEY (`campana_id`) REFERENCES `Campanas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Datos_generales` ADD CONSTRAINT `Datos_generales_campana_id_fkey` FOREIGN KEY (`campana_id`) REFERENCES `Campanas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contactos` ADD CONSTRAINT `Contactos_campana_id_fkey` FOREIGN KEY (`campana_id`) REFERENCES `Campanas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campanas_detalle` ADD CONSTRAINT `Campanas_detalle_campana_id_fkey` FOREIGN KEY (`campana_id`) REFERENCES `Campanas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campanas_detalle` ADD CONSTRAINT `Campanas_detalle_gestor_id_fkey` FOREIGN KEY (`gestor_id`) REFERENCES `Gestores_campana`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campanas_detalle` ADD CONSTRAINT `Campanas_detalle_datos_generales_id_fkey` FOREIGN KEY (`datos_generales_id`) REFERENCES `Datos_generales`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campanas_detalle` ADD CONSTRAINT `Campanas_detalle_contacto_id_fkey` FOREIGN KEY (`contacto_id`) REFERENCES `Contactos`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campanas_detalle` ADD CONSTRAINT `Campanas_detalle_imagen_id_fkey` FOREIGN KEY (`imagen_id`) REFERENCES `Imagen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
