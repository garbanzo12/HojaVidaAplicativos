import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📌 Obtener todas las campañas
export const getCampanas = async (req, res) => {
  try {
    const campanas = await prisma.campanas.findMany();
    res.json(campanas);
  } catch (error) {
    console.error('Error al obtener las campañas:', error);
    res.status(500).json({ message: 'Error al obtener las campañas' });
  }
};

// 📌 Obtener una campaña por ID
export const getCampanaById = async (req, res) => {
  try {
    const { id } = req.params;
    const campana = await prisma.campanas.findUnique({
      where: { id: Number(id) },
    });

    if (!campana) {
      return res.status(404).json({ message: 'Campaña no encontrada' });
    }

    res.json(campana);
  } catch (error) {
    console.error('Error al obtener la campaña:', error);
    res.status(500).json({ message: 'Error al obtener la campaña' });
  }
};