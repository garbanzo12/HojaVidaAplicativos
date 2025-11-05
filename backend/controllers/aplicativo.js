import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Crear un aplicativo
export const createAplicativo = async (req, res) => {
  try {
    const data = req.validatedData; // viene del validador Zod

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
      include: { campana: true },
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
      include: { campana: true },
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

// ✅ Actualizar un aplicativo
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

