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
      select: { id: true, nombre_campana: true },
    });

    res.json({ success: true, campanas });
  } catch (error) {
    console.error("Error al obtener campañas:", error);
    res.status(500).json({ success: false, message: "Error al obtener campañas" });
  }
};
// ✅ Obtener todas las campañas con sus relaciones
export const getCampanasDetalles = async (req, res) => {
  try {
    const campanas = await prisma.campana.findMany({
      include: {
        aplicativos: true,
        matrizEscalamientos: true,
        matrizEscalamientoGlobal: true,
      },
    });

    res.json(campanas);
  } catch (error) {
    console.error("Error al obtener campañas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener campañas.",
    });
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
 
  try {
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
      estado,
    } = req.body;

    // 📸 Guardar nombres de archivo si existen
    const imagen_cliente = req.files?.imagen_cliente
      ? req.files.imagen_cliente[0].filename
      : null;

    const imagen_sede = req.files?.imagen_sede
      ? req.files.imagen_sede[0].filename
      : null;

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
     console.log("🧾 BODY:", req.body);
    console.log("🖼️ FILES:", req.files);
    res.status(201).json({
      success: true,
      message: "Campaña creada correctamente",
      nuevaCampana,
    });
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




export const updateEstadoCampana = async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Buscar la campaña por ID
    const campana = await prisma.campana.findUnique({
      where: { id: Number(id) },
    });

    // 2️⃣ Si no existe, devolver error
    if (!campana) {
      return res.status(404).json({
        success: false,
        message: "Campaña no encontrada.",
      });
    }

    // 3️⃣ Determinar el nuevo estado
    const nuevoEstado =
      campana.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    // 4️⃣ Actualizar en base de datos
    const campanaActualizada = await prisma.campana.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    });

    // 5️⃣ Responder con éxito
    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: campanaActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el estado de la campaña:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado de la campaña.",
    });
  }
};