import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Ruta de prueba
export const testConnection = (req, res) => {
  res.send("Servidor y Prisma funcionando correctamente 🚀");
};

// ✅ Obtener todas las campañas
export const getCampanas = async (req, res) => {
  try {
    const campanas = await prisma.campana.findMany({
      include: {
        aplicativos: true,
        matrizEscalamientos: true,
        matrizEscalamientoGlobal: true,
      },
    });
    res.status(200).json(campanas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las campañas", error });
  }
};

// ✅ Obtener campaña por ID
export const getCampanaById = async (req, res) => {
  const { id } = req.params;

  try {
    const campana = await prisma.campana.findUnique({
      where: { id: Number(id) },
      include: {
        aplicativos: true,
        matrizEscalamientos: true,
        matrizEscalamientoGlobal: true,
      },
    });

    if (!campana) {
      return res.status(404).json({ message: "Campaña no encontrada" });
    }

    res.status(200).json(campana);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la campaña", error });
  }
};

// ✅ Crear nueva campaña
export const createCampana = async (req, res) => {
  const {
    nombre_campana,
    cliente,
    director_operacion_abai,
    correo_director,
    segmento,
    nombre_gte_campana,
    correo_gte_campana,
    ubicacion_sedes,
    puestos_operacion,
    puestos_estructura,
    segmento_red,
    fecha_actualizacion,
    nombre_contacto_cliente,
    correo_contacto_cliente,
    telefono_contacto_cliente,
    nombre_contacto_comercial,
    correo_contacto_comercial,
    telefono_contacto_comercial,
    soporte_tecnico_abai,
    correo_soporte_abai,
    servicios_prestados,
    imagen_cliente,
    imagen_sede,
    estado,
  } = req.validatedBody;

  try {
    const nuevaCampana = await prisma.campana.create({
      data: {
        nombre_campana,
        cliente,
        director_operacion_abai,
        correo_director,
        segmento,
        nombre_gte_campana,
        correo_gte_campana,
        ubicacion_sedes,
        puestos_operacion: Number(puestos_operacion),
        puestos_estructura: Number(puestos_estructura),
        segmento_red,
        fecha_actualizacion: new Date(fecha_actualizacion),
        nombre_contacto_cliente,
        correo_contacto_cliente,
        telefono_contacto_cliente,
        nombre_contacto_comercial,
        correo_contacto_comercial,
        telefono_contacto_comercial,
        soporte_tecnico_abai,
        correo_soporte_abai,
        servicios_prestados,
        imagen_cliente,
        imagen_sede,
        estado,
      },
    });

    res.status(201).json(nuevaCampana);
  } catch (error) {
    console.error("❌ Error al crear la campaña:", error);
    res.status(500).json({ error: "Error al crear la campaña" });
  }
};

// ✅ Actualizar campaña
export const updateCampana = async (req, res) => {
  const { id } = req.params;

  try {
    const campanaActualizada = await prisma.campana.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(campanaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la campaña" });
  }
};

// ✅ Eliminar campaña
export const deleteCampana = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.campana.delete({ where: { id } });
    res.json({ message: "Campaña eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la campaña" });
  }
};
