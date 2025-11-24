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

export const getCampanasDetalles = async (req, res) => {
  try {
    const campanas = await prisma.campana.findMany({

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
          matriz_escalamiento: true,
          matriz_escalamiento_global: true,
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

    console.log("📥 BODY COMPLETO:", req.body);

    // ----------------------------
    // 1. NORMALIZAR ARRAYS
    // ----------------------------

    // Aplicativos
    let aplicativoIds = req.body["aplicativoId[]"] || req.body.aplicativoId || [];
    if (!Array.isArray(aplicativoIds)) aplicativoIds = [aplicativoIds];
    aplicativoIds = aplicativoIds.map(Number).filter(Boolean);

    // Matriz Escalamiento Normal
    let matrizIds = req.body["matrizId[]"] || req.body.matrizId || [];
    if (!Array.isArray(matrizIds)) matrizIds = [matrizIds];
    matrizIds = matrizIds.map(Number).filter(Boolean);

    // Matriz Escalamiento GLOBAL
    let matrizGlobalIds = req.body["matrizGlobalId[]"] || req.body.matrizGlobalId || [];
    if (!Array.isArray(matrizGlobalIds)) matrizGlobalIds = [matrizGlobalIds];
    matrizGlobalIds = matrizGlobalIds.map(Number).filter(Boolean);

    console.log("📌 APLICATIVOS IDs:", aplicativoIds);
    console.log("📌 MATRIZ NORMAL IDs:", matrizIds);
    console.log("📌 MATRIZ GLOBAL IDs:", matrizGlobalIds);

    // ----------------------------
    // 2. ARCHIVOS
    // ----------------------------
    const imagen_cliente = req.files?.imagen_cliente
      ? req.files.imagen_cliente[0].filename
      : null;

    const imagen_sede = req.files?.imagen_sede
      ? req.files.imagen_sede[0].filename
      : null;

    // ----------------------------
    // 3. CREAR CAMPANA + RELACIONES
    // ----------------------------

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
        estado,

        // Relaciones
        aplicativos: {
          connect: aplicativoIds.map(id => ({ id }))
        },

        matriz_escalamiento: {
          connect: matrizIds.map(id => ({ id }))
        },

        matriz_escalamiento_global: {
          connect: matrizGlobalIds.map(id => ({ id }))
        },

        imagen_cliente,
        imagen_sede,
      },
    });

    console.log("✅ APLICATIVOS GUARDADOS:", aplicativoIds);
    console.log("✅ MATRIZ NORMAL GUARDADOS:", matrizIds);
    console.log("✅ MATRIZ GLOBAL GUARDADOS:", matrizGlobalIds);

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
    // 1. Verificar existencia
    const existing = await prisma.campana.findUnique({
      where: { id: campanaId }
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: "Campaña no encontrada." });
    }

    // 2. Body RAW (viene como strings)
    const raw = { ...req.body };
    delete raw.id;

    const dataToUpdate = {};

    // --------- STRINGS ---------
    const camposString = [
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
      "estado"
    ];

    camposString.forEach(campo => {
      if (raw[campo] && raw[campo].trim() !== "") {
        dataToUpdate[campo] = raw[campo];
      }
    });

    // --------- NÚMEROS ---------
    if (raw.puestos_operacion !== undefined) {
      const n = Number(raw.puestos_operacion);
      if (!Number.isNaN(n)) dataToUpdate.puestos_operacion = n;
    }

    if (raw.puestos_estructura !== undefined) {
      const n = Number(raw.puestos_estructura);
      if (!Number.isNaN(n)) dataToUpdate.puestos_estructura = n;
    }

    // --------- FECHA ---------
    if (raw.fecha_actualizacion) {
      const d = new Date(raw.fecha_actualizacion);
      if (!isNaN(d.getTime())) dataToUpdate.fecha_actualizacion = d;
    }

    console.log("📌 Campos normales:", dataToUpdate);

    // ============================================================
    // 🔥 RELACIONES (CONVERSION REAL)
    // ============================================================

    // UTIL para convertir string o array → array de números
    const parseIds = (input) => {
      if (!input) return [];
      if (Array.isArray(input)) return input.map(v => Number(v));
      return [Number(input)];
    };

    // Recibir lo que manda el frontend
    const aplicativosIds = parseIds(raw.aplicativoId);
    const matrizIds = parseIds(raw.matrizId);
    const matrizGlobalIds = parseIds(raw.matrizGlobalId);

    console.log("📌 aplicativosIds =>", aplicativosIds);
    console.log("📌 matrizIds =>", matrizIds);
    console.log("📌 matrizGlobalIds =>", matrizGlobalIds);

    // ============================================================
    // 🔥 UPDATE EN PRISMA
    // ============================================================

    const updated = await prisma.campana.update({
      where: { id: campanaId },
      data: {
        ...dataToUpdate,

        // 1:N aplicativos
        ...(aplicativosIds.length > 0 && {
          aplicativos: {
            set: aplicativosIds.map(id => ({ id }))
          }
        }),

        // M:N matriz_escalamiento
        ...(matrizIds.length > 0 && {
          matriz_escalamiento: {
            set: matrizIds.map(id => ({ id }))
          }
        }),

        // M:N matriz_escalamiento_global
        ...(matrizGlobalIds.length > 0 && {
          matriz_escalamiento_global: {
            set: matrizGlobalIds.map(id => ({ id }))
          }
        })
      }
    });

    return res.status(200).json({
      success: true,
      message: "Campaña actualizada correctamente",
      data: updated
    });

  } catch (error) {
    console.error("❌ ERROR UPDATE:", error);
    return res.status(500).json({ success: false, message: "Error al actualizar", error });
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