import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



// Crear Aplicativo del Proveedor
export const createAplicativoProveedor = async (req, res) => {
  try {
    const { puerto, url, tipo_red, escalamiento } = req.body;

    const nuevo = await prisma.aplicativos_proveedor.create({
      data: { puerto, url, tipo_red, escalamiento },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear aplicativo del proveedor:', error);
    res.status(500).json({ error: 'Error al crear aplicativo del proveedor' });
  }
};

// 📌 Obtener todos los proveedores
export const getProveedor = async (req, res) => {
  try {
    const proveedores = await prisma.aplicativos_proveedor.findMany();
    res.json(proveedores);
  } catch (error) {
    console.error('Error al obtener los datos del proveedor:', error);
    res.status(500).json({ message: 'Error al obtener los datos del proveedor' });
  }
};

// 📌 Obtener un proveedor por ID
export const getProveedorById = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await prisma.aplicativos_proveedor.findUnique({
      where: { id: Number(id) },
    });

    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json(proveedor);
  } catch (error) {
    console.error('Error al obtener el proveedor:', error);
    res.status(500).json({ message: 'Error al obtener el proveedor2' });
  }
};