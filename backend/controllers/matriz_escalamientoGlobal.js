import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const createMatrizEscalamientoGlobal = async (req, res) => {
  try {
    const {
      proveedor,
      codigo_servicio,
      n_telefono_proveedor,
      n_telefono_asesor,
    } = req.body;


    const nuevaMatrizGlobal = await prisma.matriz_escalamiento_global.create({
      data: {
        proveedor,
        codigo_servicio,
        n_telefono_proveedor,
        n_telefono_asesor,
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


// Actualizar registro
export const updateMatrizGlobal = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.validatedData;
    let updateData = { ...data };


    if (Object.prototype.hasOwnProperty.call(data, 'campanas')) {
      
      const campanaIDs = (data.campanas || []).map(id => Number(id)); 

      if (campanaIDs.length > 0) {
        const campanasEncontradas = await prisma.campana.findMany({
          where: { id: { in: campanaIDs } },
          select: { id: true, nombre_campana: true, estado: true }
        });

        if (campanasEncontradas.length !== campanaIDs.length) {
          return res.status(400).json({
            success: false,
            message: "Una o más campañas seleccionadas no existen.",
          });
        }

        const campanaInactiva = campanasEncontradas.find(c => c.estado !== "HABILITADO");
        if (campanaInactiva) {
          return res.status(400).json({
            success: false,
            message: `La campaña "${campanaInactiva.nombre_campana}" está inactiva y no puede ser asignada.`,
          });
        }
      }
      

      updateData.campanas = {
        set: campanaIDs.map(id => ({ id })),
      };

      
    } 
    // ---------------------------------

    const matrizActualizada = await prisma.matriz_escalamiento_global.update({
      where: { id: Number(id) },
      data: updateData, 
      include: {
        campanas: { select: { id: true, nombre_campana: true } }
      }
    });

    res.json({
      success: true,
      message: "Matriz actualizada exitosamente.",
      data: matrizActualizada,
    });
  } catch (error) {
    console.error('Error al actualizar Matriz:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al actualizar la matriz. Verifique si los datos son válidos o si la conexión es correcta.' 
    });
  }
};

// 📌 Obtener todas las matrices
export const getMatrizGlobal = async (req, res) => {
  try {
    const matrices = await prisma.matriz_escalamiento_global.findMany({
  
    });
    res.json(matrices);
  } catch (error) {
    console.error('Error al obtener las matrices:', error);
    res.status(500).json({ message: 'Error al obtener las matrices' });
  }
};


export const getMatrizGlobalById = async (req, res) => {
  try {
    const { id } = req.params;
    const matriz = await prisma.matrizescalamientoglobal.findUnique({
      where: { id: Number(id) },
      include: {
        campanas: { // 👈 Asegúrate de incluir la lista de campañas
          select: { id: true, nombre_campana: true, cliente: true } 
        }
      }
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


export const updateEstadomatrizGlobal= async (req, res) => {
  const { id } = req.params;

  try {
    // 1️⃣ Buscar la campaña por ID
    const matriz = await prisma.matrizescalamientoglobal.findUnique({
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
    const matrizActualizada = await prisma.matrizescalamientoglobal.update({
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