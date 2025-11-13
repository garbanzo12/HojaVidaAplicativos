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

export const createMatrizEscalamientoGlobal = async (req, res) => {
  try {
    const {
      proveedor,
      codigo_servicio,
      n_telefono_proveedor,
      n_telefono_asesor,
      campanaId,
    } = req.body;

    const nuevaMatrizGlobal = await prisma.matrizEscalamientoGlobal.create({
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
      data: nuevaMatrizGlobal,
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
    const matrices = await prisma.matrizEscalamiento.findMany({
      include: {
        campana: {
          select: {
            id: true,
            nombre_campana: true,
          },
        },
      },
    });
    res.json(matrices);
  } catch (error) {
    console.error('Error al obtener las matrices:', error);
    res.status(500).json({ message: 'Error al obtener las matrices' });
  }
};


// 📌 Obtener todas las matrices
export const getMatrizGlobal = async (req, res) => {
  try {
    const matrices = await prisma.matrizEscalamientoGlobal.findMany({
      include: {
        campana: {
          select: {
            id: true,
            nombre_campana: true,
          },
        },
      },
    });
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
    const matriz = await prisma.matrizEscalamiento.findUnique({
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




export const updateEstadomatriz= async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Buscar la campaña por ID
    const matriz = await prisma.matrizEscalamiento.findUnique({
      where: { id: Number(id) },
    });

    // 2️⃣ Si no existe, devolver error
    if (!matriz) {
      return res.status(404).json({
        success: false,
        message: "matriz no encontrada.",
      });
    }

    // 3️⃣ Determinar el nuevo estado
    const nuevoEstado =
      matriz.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    // 4️⃣ Actualizar en base de datos
    const matrizActualizada = await prisma.matrizEscalamiento.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    });

    // 5️⃣ Responder con éxito
    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: matrizActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el estado de la matriz:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado de la matriz.",
    });
  }
};




export const updateEstadomatrizGlobal= async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Buscar la campaña por ID
    const matriz = await prisma.matrizEscalamientoGlobal.findUnique({
      where: { id: Number(id) },
    });

    // 2️⃣ Si no existe, devolver error
    if (!matriz) {
      return res.status(404).json({
        success: false,
        message: "matriz no encontrada.",
      });
    }

    // 3️⃣ Determinar el nuevo estado
    const nuevoEstado =
      matriz.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    // 4️⃣ Actualizar en base de datos
    const matrizActualizada = await prisma.matrizEscalamientoGlobal.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    });

    // 5️⃣ Responder con éxito
    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: matrizActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el estado de la matriz:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado de la matriz.",
    });
  }
};





// ✏️ Actualizar registro
export const updateMatriz = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.validatedData;

    const matrizActualizado = await prisma.matrizEscalamiento.update({
      where: { id: Number(id) },
      data,
    });

    res.json({
      success: true,
      message: "Matriz actualizado exitosamente.",
      data: matrizActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar Matriz:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el Matriz.",
    });
  }
};