import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ✅ Crear matriz
export const createMatrizEscalamiento = async (req, res) => {
  try {
    const {
      proveedor,
      codigo_servicio,
      n_telefono_proveedor,
      n_telefono_asesor,
      campanaId,
    } = req.body;

    const nuevaMatriz = await prisma.matrizEscalamiento.create({
      data: {
        proveedor,
        codigo_servicio,
        n_telefono_proveedor,
        n_telefono_asesor,
        campanaId: Number(campanaId),
        estado: "HABILITADO",
      },
    });

    res.json({
      success: true,
      message: "Matriz creada exitosamente.",
      data: nuevaMatriz,
    });
  } catch (error) {
    console.error("Error al crear matriz:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear la matriz.",
    });
  }
};



// 📌 Obtener todas las matrices
export const getMatriz = async (req, res) => {
  try {
    const matrices = await prisma.matriz_escalamiento.findMany();
    res.json(matrices);
  } catch (error) {
    console.error('Error al obtener las matrices:', error);
    res.status(500).json({ message: 'Error al obtener las matrices' });
  }
};

// 📌 Obtener una matriz por ID
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