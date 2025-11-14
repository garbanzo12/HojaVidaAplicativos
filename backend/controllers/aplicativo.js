import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Crear un aplicativo
export const createAplicativo = async (req, res) => {
  try {
    const data = req.validatedData; // viene del validador Zod
   if (data.campanaId) {
      const campana = await prisma.campana.findUnique({
        where: { id: Number(data.campanaId) },
      });

      if (!campana) {
        return res.status(400).json({
          success: false,
          message: "La campaña seleccionada no existe.",
        });
      }

      if (campana.estado !== "HABILITADO") {
        return res.status(400).json({
          success: false,
          message: `La campaña "${campana.nombre}" está inactiva y no puede ser asignada.`,
        });
      }
    }
    const nuevoAplicativo = await prisma.aplicativo.create({
      data,
    });

    res.status(201).json({
      success: true,
      message: "Aplicativo creado exitosamente.",
      data: nuevoAplicativo,
    });
  } catch (error) {
    console.error("Error al crear aplicativo:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el aplicativo.",
    });
  }
};

// ✅ Obtener todos los aplicativos
export const getAplicativos = async (req, res) => {
  try {
    const aplicativos = await prisma.aplicativo.findMany({
      include: {
        campana: {
          select: {
            id: true,
            nombre_campana: true,
          },
        },
      },
    });
    res.json(aplicativos);
  } catch (error) {
    console.error("Error al obtener aplicativos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener aplicativos.",
    });
  }
};

// ✅ Obtener un aplicativo por ID
export const getAplicativoById = async (req, res) => {
  try {
    const { id } = req.params;
    const aplicativo = await prisma.aplicativo.findUnique({
      where: { id: Number(id) },
    });

    if (!aplicativo) {
      return res.status(404).json({ message: "Aplicativo no encontrado." });
    }

    res.json(aplicativo);
  } catch (error) {
    console.error("Error al obtener aplicativo:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el aplicativo.",
    });
  }
};

//✅ Actualizar un aplicativo
export const updateAplicativo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.validatedData;

    const aplicativoActualizado = await prisma.aplicativo.update({
      where: { id: Number(id) },
      data,
    });

    res.json({
      success: true,
      message: "Aplicativo actualizado exitosamente.",
      data: aplicativoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar aplicativo:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el aplicativo.",
    });
  }
};




export const updateEstadoaplicativo = async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Buscar la campaña por ID
    const aplicativo = await prisma.aplicativo.findUnique({
      where: { id: Number(id) },
    });

    // 2️⃣ Si no existe, devolver error
    if (!aplicativo) {
      return res.status(404).json({
        success: false,
        message: "Campaña no encontrada.",
      });
    }

    // 3️⃣ Determinar el nuevo estado
    const nuevoEstado =
      aplicativo.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    // 4️⃣ Actualizar en base de datos
    const aplicativoActualizada = await prisma.aplicativo.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    });

    // 5️⃣ Responder con éxito
    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: aplicativoActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el estado de la aplicativo:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado de la aplicativo.",
    });
  }
};