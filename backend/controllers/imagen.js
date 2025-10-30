import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📌 Obtener todas las gestores
export const getImagenes = async (req, res) => {
  try {
    const imagenes = await prisma.Imagen.findMany();
    res.json(imagenes);
  } catch (error) {
    console.error('Error al obtener las imagenes:', error);
    res.status(500).json({ message: 'Error al obtener las imagenes' });
  }
};

// 📌 Obtener una campaña por ID
export const getImagenesById = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await prisma.Imagen.findUnique({
      where: { id: Number(id) },
    });

    if (!imagen) {
      return res.status(404).json({ message: 'imagen no encontrada' });
    }

    res.json(imagen);
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    res.status(500).json({ message: 'Error al obtener la imagen' });
  }
};

