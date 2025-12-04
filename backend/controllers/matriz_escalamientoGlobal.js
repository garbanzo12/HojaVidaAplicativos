import { PrismaClient } from "@prisma/client"; // Estoy importanto el cliente de prisma
const prisma = new PrismaClient(); // Inicializo el cliente de prisma con una variable prisma


export const createMatrizEscalamientoGlobal = async (req, res) => {// Creo mi función para crear una matriz de escalamiento global
  try {
    const {
      proveedor,
      codigo_servicio,
      n_telefono_proveedor,
      n_telefono_asesor,
    } = req.body; // Le asigno los datos que se esperan al cuerpo


    const nuevaMatrizGlobal = await prisma.matriz_escalamiento_global.create({
      data: {
        proveedor,
        codigo_servicio,
        n_telefono_proveedor,
        n_telefono_asesor,
        estado: "HABILITADO",
      },  // Creo el nuevo registro con los datos que llegan del data
    }); 

    res.json({
      success: true,
      message: "Matriz creada exitosamente.",
      data: nuevaMatrizGlobal,
    }); // Si no hay ningun problema en la petición se da un resultado verdadero, se manda un mensaje y el cuerpo
  } catch (error) {
    console.error("Error al crear matriz:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear la matriz.",
    });
  }// Si llega a haber un catch si imprime el error y se devuelve 500
};

// 📌 Obtener todas las matrices
export const getMatrizGlobal = async (req, res) => { // Creo la función para omar mis matrices
  try {
    const matrices = await prisma.matriz_escalamiento_global.findMany({}); //Busco todas las matrices de escalamiento en mi bd
    res.json(matrices); // Si no hay problemas en la peticion se devuelve como un estado exitoso todas las matrices globales
  } catch (error) {
    console.error('Error al obtener las matrices:', error);
    res.status(500).json({ message: 'Error al obtener las matrices' }); // Si hay algun error, el catch devuelve un 500 y un mensaje de error
  }
};

// 📌 Obtener una matriz global por ID
export const getMatrizGlobalById = async (req, res) => { // Creo mi función para obtener una matriz global por su id
  try {
    const { id } = req.params; //Obtengo el id del cuerpo
    const matriz = await prisma.matriz_escalamiento_global.findUnique({
      where: { id: Number(id) }, // Tomo el registro que encuentre la bd segun su id
    });

    if (!matriz) { // Si no se encuentra matriz se devuelve un 404
      return res.status(404).json({ message: 'Matriz no encontrada' });
    }

    res.json(matriz); // Si se encuentra una matriz global se devuelve retorna en la petición
  } catch (error) {
    console.error('Error al obtener el aplicativo:', error);
    res.status(500).json({ message: 'Error al obtener la Matriz' });// Si hay un catch se devuleve 500 con un mensaje
  }
};

// Actualizar registro
export const updateMatrizGlobal = async (req, res) => { // Creo mi función para actualizar mi matriz
  try {
    const { id } = req.params; // Obtengo el id del cuerpo  
    const data = req.validatedData; // Hago un validateData para validar que los datos sean aceptados

    const matrizActualizada = await prisma.matriz_escalamiento_global.update({ // Actualizo la matriz de escalamiento global
      where: { id: Number(id) }, // Segun el id
      data, // Con el nuevo data
    });

    res.json({
      success: true,
      message: "Matriz actualizada exitosamente.",
      data: matrizActualizada,
    }); // Si la petición es satisfactoria se muestra mensaje de exito y el cuerpo
  } catch (error) {
    console.error('Error al actualizar Matriz:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al actualizar la matriz. Verifique si los datos son válidos o si la conexión es correcta.' 
    });  // Si hay un catch se muestra 500 y un mensaje de error
  }
};






export const updateEstadomatrizGlobal= async (req, res) => { // Creo mi función para actualizar el estado de una matriz global
  const { id } = req.params;//  Obtengo el id del cuerpo
  // A continuación los pasos para actualizar el estado de la matriz 

  try {
    // 1️⃣ Buscar la campaña por ID
    const matriz = await prisma.matriz_escalamiento_global.findUnique({
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
    const matrizActualizada = await prisma.matriz_escalamiento_global.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    });

    // 5️⃣ Responder con éxito
    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: matrizActualizada,
    }); // Si la petición es satisfactoria se muestra mensaje de exito y el cuerpo
  } catch (error) {
    console.error("Error al actualizar el estado de la matriz:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado de la matriz.",
    }); // Si hay un catch se muestra 500 junto a un mensaje de error
  }
};