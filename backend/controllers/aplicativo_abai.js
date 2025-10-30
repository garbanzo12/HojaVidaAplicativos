import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 📌 Crear todas las campañas
export const createAplicativoAbai = async (req, res) => {
  try {
    const { nombre, direccion_ip, puerto, url, tipo_red, escalamiento } = req.body;

    const nuevo = await prisma.aplicativos_abai.create({
      data: { nombre, direccion_ip, puerto, url, tipo_red, escalamiento },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear aplicativo ABAI:', error);
    res.status(500).json({ error: 'Error al crear aplicativo ABAI' });
  }
};



// 📌 Obtener todas las campañas
export const getAplicativoabai = async (req, res) => {
  try {
    const aps_abai = await prisma.aplicativos_abai.findMany();
    res.json(aps_abai);
  } catch (error) {
    console.error('Error al obtener los aplicativos de abai:', error);
    res.status(500).json({ message: 'Error al obtener los aplicativos de abai' });
  }
};

// 📌 Obtener una campaña por ID
export const getAplicativoabaiById = async (req, res) => {
  try {
    const { id } = req.params;
    const ap_abai = await prisma.aplicativos_abai.findUnique({
      where: { id: Number(id) },
    });

    if (!ap_abai) {
      return res.status(404).json({ message: 'Aplicativo no encontrada' });
    }

    res.json(ap_abai);
  } catch (error) {
    console.error('Error al obtener el aplicativo:', error);
    res.status(500).json({ message: 'Error al obtener el aplicativo' });
  }
};