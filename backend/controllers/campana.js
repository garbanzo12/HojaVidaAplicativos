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
      select: { id: true, nombre_campana: true , estado : true },
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
  const campanaId = Number(id);

  if (Number.isNaN(campanaId)) {
    return res.status(400).json({ success: false, message: "ID inválido." });
  }

  try {
    // 1) Buscar existencia
    const existing = await prisma.campana.findUnique({ where: { id: campanaId } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Campaña no encontrada." });
    }

    // 2) Clonar y limpiar body
    // NOTE: req.body viene de multer (multipart/form-data) como strings
    const raw = { ...req.body }; // texto crudo
    // Elimina id si existe
    delete raw.id;

    // 3) Construir dataToUpdate sólo con campos válidos (evitar enviar "" o undefined)
    const dataToUpdate = {};

    // Helper para setear campo si tiene valor no vacío
    const setIfNotEmpty = (key, transform = (v) => v) => {
      if (raw[key] !== undefined && raw[key] !== null && String(raw[key]).trim() !== "") {
        dataToUpdate[key] = transform(raw[key]);
      }
    };

    // Campos string simples
    [
      "nombre_campana",
      "cliente",
      "director_operacion_abai",
      "correo_director",
      "segmento",
      "nombre_gte_campana",
      "correo_gte_campana",
      "ubicacion_sedes",
      "segmento_red",
      "nombre_contacto_cliente",
      "correo_contacto_cliente",
      "telefono_contacto_cliente",
      "nombre_contacto_comercial",
      "correo_contacto_comercial",
      "telefono_contacto_comercial",
      "soporte_tecnico_abai",
      "correo_soporte_abai",
      "servicios_prestados",
      "imagen_cliente",
      "imagen_sede",
      "estado",
    ].forEach((k) => setIfNotEmpty(k, (v) => String(v)));

    // Campos numéricos
    setIfNotEmpty("puestos_operacion", (v) => {
      const n = Number(v);
      return Number.isNaN(n) ? undefined : n;
    });
    setIfNotEmpty("puestos_estructura", (v) => {
      const n = Number(v);
      return Number.isNaN(n) ? undefined : n;
    });

    // Fecha: intentar convertir a Date válido
    if (raw.fecha_actualizacion !== undefined && String(raw.fecha_actualizacion).trim() !== "") {
      let fechaRaw = String(raw.fecha_actualizacion).trim();

      // Si viene sólo YYYY-MM-DD, añade tiempo UTC para formar ISO
      if (/^\d{4}-\d{2}-\d{2}$/.test(fechaRaw)) {
        fechaRaw = fechaRaw + "T00:00:00.000Z";
      }

      const d = new Date(fechaRaw);
      if (!Number.isNaN(d.getTime())) {
        dataToUpdate.fecha_actualizacion = d; // Date object, Prisma acepta Date
      } else {
        // Si la fecha no es válida, elimina para no romper Prisma (o retorna error)
        console.warn("Fecha inválida recibida:", raw.fecha_actualizacion);
        // opcional: return res.status(400).json({ success:false, message:"Fecha inválida" });
      }
    }

    // 4) Archivos (multer)
    // Dependiendo de cómo uses multer: upload.single("imagen_cliente") -> req.file
    // o upload.fields([{name:'imagen_cliente'},{name:'imagen_sede'}]) -> req.files
    if (req.file) {
      // ejemplo: filename si usas diskStorage
      dataToUpdate.imagen_cliente = req.file.filename || req.file.originalname;
    }
    if (req.files) {
      // si usas upload.fields(...)
      // req.files['imagen_cliente'] -> array
      if (req.files.imagen_cliente && req.files.imagen_cliente[0]) {
        dataToUpdate.imagen_cliente = req.files.imagen_cliente[0].filename || req.files.imagen_cliente[0].originalname;
      }
      if (req.files.imagen_sede && req.files.imagen_sede[0]) {
        dataToUpdate.imagen_sede = req.files.imagen_sede[0].filename || req.files.imagen_sede[0].originalname;
      }
    }

    // 5) Manejo de campos JSON/arrays que vienen como string en FormData
    // p.ej. aplicativos podría venir como JSON string; evita enviar "[object Object]"
    if (raw.aplicativos !== undefined && raw.aplicativos !== "") {
      // intenta parsear JSON, si falla, ignora (o maneja aparte)
      try {
        const parsed = typeof raw.aplicativos === "string" ? JSON.parse(raw.aplicativos) : raw.aplicativos;
        // no lo pongas directamente en dataToUpdate si es relación; manejar relaciones por separado
        // por ahora, guarda como texto si quieres:
        // dataToUpdate.aplicativos = JSON.stringify(parsed);
        // o marca para procesar luego:
        req._parsed_aplicativos = parsed;
      } catch (err) {
        console.warn("No se pudo parsear aplicativos:", err);
      }
    }

    // 6) DEBUG: mostrar qué se enviará a Prisma
    console.log("Data que se enviará a prisma.campana.update:", dataToUpdate);

    // Si no hay nada que actualizar:
    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({ success: false, message: "No hay datos válidos para actualizar." });
    }

    // 7) Realizar la actualización (y manejar relaciones en transacción si necesitas)
    const updated = await prisma.campana.update({
      where: { id: campanaId },
      data: dataToUpdate,
    });

    // 8) Si había aplicaciones/relaciones en req._parsed_aplicativos, las procesas en un tx (opcional)
    if (req._parsed_aplicativos && Array.isArray(req._parsed_aplicativos)) {
      // Ejemplo simple: eliminar existentes y crear nuevas (ten cuidado con esta lógica en producción)
      await prisma.$transaction(async (tx) => {
        await tx.aplicativo.deleteMany({ where: { campanaId: campanaId } });
        for (const app of req._parsed_aplicativos) {
          // mapear campos según tu modelo Aplicativo
          await tx.aplicativo.create({
            data: {
              nombre: app.nombre,
              direccion_ip: app.direccion_ip,
              puerto: Number(app.puerto) || 0,
              url: app.url,
              tipo_aplicativo: app.tipo_aplicativo,
              escalamiento: app.escalamiento,
              campanaId: campanaId,
              estado: app.estado || "HABILITADO",
            },
          });
        }
      });
    }

    return res.status(200).json({ success: true, message: "Campaña actualizada", data: updated });
  } catch (error) {
    console.error("❌ Error en updateCampana:", error);
    // devolver detalle mínimo para debugging
    return res.status(400).json({ success: false, message: "Error al actualizar campaña", error: error.message });
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