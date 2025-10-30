import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const createAplicativoInternet = async (req, res) => {
  try {
    const { nombre, direccion_ip, puerto, url, tipo_red, escalamiento } = req.body;

    const nuevo = await prisma.aplicativos_internet.create({
      data: { nombre, direccion_ip, puerto, url, tipo_red, escalamiento },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear aplicativo de Internet:', error);
    res.status(500).json({ error: 'Error al crear aplicativo de Internet' });
  }
};


// 📌 Obtener todas las campañas
export const getAplicativoInternet= async (req, res) => {
  try {
    const aps_internet = await prisma.aplicativos_internet.findMany();
    res.json(aps_internet);
  } catch (error) {
    console.error('Error al obtener los aplicativos de internet:', error);
    res.status(500).json({ message: 'Error al obtener los aplicativos de internet' });
  }
};

// 📌 Obtener una campaña por ID
export const getAplicativoInternetById = async (req, res) => {
  try {
    const { id } = req.params;
    const ap_internet = await prisma.aplicativos_internet.findUnique({
      where: { id: Number(id) },
    });

    if (!ap_internet) {
      return res.status(404).json({ message: 'Aplicativo no encontrada' });
    }

    res.json(ap_internet);
  } catch (error) {
    console.error('Error al obtener el aplicativo:', error);
    res.status(500).json({ message: 'Error al obtener el aplicativo' });
  }
};