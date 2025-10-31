import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📌 Obtener todas las gestores
export const getGestores = async (req, res) => {
  try {
    const gestores = await prisma.gestores_campana.findMany();
    res.json(gestores);
  } catch (error) {
    console.error('Error al obtener las gestores:', error);
    res.status(500).json({ message: 'Error al obtener las gestores' });
  }
};

// 📌 Obtener un gestor por ID
export const getGestoresById = async (req, res) => {
  try {
    const { id } = req.params;
    const gestor = await prisma.gestores_campana.findUnique({
      where: { id: Number(id) },
    });

    if (!gestor) {
      return res.status(404).json({ message: 'Gestor de campaña no encontrada' });
    }

    res.json(gestor);
  } catch (error) {
    console.error('Error al obtener el gestor campaña:', error);
    res.status(500).json({ message: 'Error al obtener la campaña' });
  }
};