import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📌 Obtener todos los conytactos
export const getContactos = async (req, res) => {
  try {
    const contactos = await prisma.Contactos.findMany();
    res.json(contactos);
  } catch (error) {
    console.error('Error al obtener los contactos:', error);
    res.status(500).json({ message: 'Error al obtener los contactos' });
  }
};

// 📌 Obtener un contacto por ID
export const getContactosById = async (req, res) => {
  try {
    const { id } = req.params;
    const contacto = await prisma.Contactos.findUnique({
      where: { id: Number(id) },
    });

    if (!contacto) {
      return res.status(404).json({ message: 'contacto no encontrado' });
    }

    res.json(contacto);
  } catch (error) {
    console.error('Error al obtener el contacto :', error);
    res.status(500).json({ message: 'Error al obtener la campaña' });
  }
};