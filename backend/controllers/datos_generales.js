import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📌 Obtener todos los datos generales
export const getDatosGenerales = async (req, res) => {
  try {
    const datos_generales = await prisma.Datos_generales.findMany();
    res.json(datos_generales);
  } catch (error) {
    console.error('Error al obtener los datos generales:', error);
    res.status(500).json({ message: 'Error al obtener los datos generales' });
  }
};

// 📌 Obtener un dato general por ID
export const getDatosGeneralesById = async (req, res) => {
  try {
    const { id } = req.params;
    const dato_general = await prisma.Datos_generales.findUnique({
      where: { id: Number(id) },
    });

    if (!dato_general) {
      return res.status(404).json({ message: 'Dato general de campaña no encontrada' });
    }

    res.json(dato_general);
  } catch (error) {
    console.error('Error al obtener el Dato general:', error);
    res.status(500).json({ message: 'Error al obtener el Dato general' });
  }
};