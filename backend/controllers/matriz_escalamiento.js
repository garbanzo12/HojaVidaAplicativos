import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const createMatrizEscalamiento = async (req, res) => {
  try {
    const { proveedor, codigo_servicio, telefono_proveedor, telefono_asesor } = req.body;

    const nuevo = await prisma.matriz_escalamiento.create({
      data: { proveedor, codigo_servicio, telefono_proveedor, telefono_asesor },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear matriz de escalamiento:', error);
    res.status(500).json({ error: 'Error al crear matriz de escalamiento' });
  }
};


// 📌 Obtener todas las campañas
export const getMatriz = async (req, res) => {
  try {
    const matrices = await prisma.matriz_escalamiento.findMany();
    res.json(matrices);
  } catch (error) {
    console.error('Error al obtener las matrices:', error);
    res.status(500).json({ message: 'Error al obtener las matrices' });
  }
};

// 📌 Obtener una campaña por ID
export const getMatrizById = async (req, res) => {
  try {
    const { id } = req.params;
    const matriz = await prisma.matriz_escalamiento.findUnique({
      where: { id: Number(id) },
    });

    if (!matriz) {
      return res.status(404).json({ message: 'Matriz no encontrada' });
    }

    res.json(matriz);
  } catch (error) {
    console.error('Error al obtener el aplicativo:', error);
    res.status(500).json({ message: 'Error al obtener la Matriz' });
  }
};