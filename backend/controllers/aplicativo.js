import { PrismaClient } from "@prisma/client"; // Estoy importanto el cliente de prisma
const prisma = new PrismaClient(); // Inicializo el cliente de prisma con una variable prisma

// ✅ Crear un aplicativo
export const createAplicativo = async (req, res) => { // Creo mi función de crear aplicativo
  try {
    const data = req.validatedData; // Valido el cuerpo de la petición
    const nuevoAplicativo = await prisma.aplicativo.create({ 
      data, // Creo mi nuevo aplicativo en base al cuerpo de la petición
    });

    res.status(201).json({
      success: true,
      message: "Aplicativo creado exitosamente.",
      data: nuevoAplicativo,
    }); // Si la petición es satisfactoria se muestra un mensaje de exito y el cuerpo
  } catch (error) {
    console.error("Error al crear aplicativo:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el aplicativo.",
    }); // Si hay un catch se muestra 500 y un mensaje 
  }
};

//Obtener todos los aplicativos
export const getAplicativos = async (req, res) => { // Creo mi función para obtener mis aplicativos
  try {
    const aplicativos = await prisma.aplicativo.findMany({ 
      select: { id: true, nombre: true , estado : true }, // Busco todos los registros de mi aplicativos y devuelvo el id, nombre y el estado

    });
    res.json(aplicativos); // Si la petición es satisfactoria se devuelven los aplicativos
  } catch (error) {
    console.error("Error al obtener aplicativos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener aplicativos.",
    }); // Si hay un catch se devuelve un 500 y un mensaje 
  }
};

export const getAplicativosDetalles = async (req, res) => {
  try {
    const aplicativo = await prisma.aplicativo.findMany({

    });

    res.json(aplicativo);
  } catch (error) {
    console.error("Error al obtener aplicativos:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener aplicativos.",
    }); 
  } // Si hay un catch se devuelve un 500 con mensaje
};

// ✅ Obtener un aplicativo por ID
export const getAplicativoById = async (req, res) => { // Creo mi función para obtener un aplicativo por su id
  try {
    const { id } = req.params; // Obtengo el id del cuerpo
    const aplicativo = await prisma.aplicativo.findUnique({
      where: { id: Number(id) }, // Busco el aplicativo segun el id
    });

    if (!aplicativo) {
      return res.status(404).json({ message: "Aplicativo no encontrado." });
    } // Si no hay aplicativo se devuelve un 404 con mensaje

    res.json(aplicativo); // Si la petición es satisfactoria se devuelve el aplicativo
  } catch (error) {
    console.error("Error al obtener aplicativo:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el aplicativo.",
    });
  } // Si hay un catch se devuelve un 500 y un mensaje
};

// Actualizar un aplicativo
export const updateAplicativo = async (req, res) => { // Creo mi función para actualizar un aplciativo
  try {
    const { id } = req.params; // Obtengo el id del cuerpoo
    const data = req.validatedData; // Valido los datos desde el validate

    const aplicativoActualizado = await prisma.aplicativo.update({
      where: { id: Number(id) },
      data,
    }); // Actualizo el aplicativo segun el id y el cuerpo 

    res.json({
      success: true,
      message: "Aplicativo actualizado exitosamente.",
      data: aplicativoActualizado,
    }); // Si la petición es satisfactoria devuelvo un mensaje exitoso y el data
  } catch (error) {
    console.error("Error al actualizar aplicativo:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el aplicativo.",
    });
  } // Si hay un catch devuelvo 500 y un mensaje
};




export const updateEstadoaplicativo = async (req, res) => { // Creo mi función para actualizar el estado de un aplciativo 
  const { id } = req.params; // Obtengo el id desde el cuerpo
  // A continuacion los pasos para actualizar el aplicativo
  try {
    
    //  Buscar la campaña por ID
    const aplicativo = await prisma.aplicativo.findUnique({
      where: { id: Number(id) },
    });

    //  Si no existe, devolver error
    if (!aplicativo) {
      return res.status(404).json({
        success: false,
        message: "Campaña no encontrada.",
      });
    }

    //  Determinar el nuevo estado
    const nuevoEstado =
      aplicativo.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    //  Actualizar en base de datos
    const aplicativoActualizada = await prisma.aplicativo.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    });

    //  Responder con éxito
    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: aplicativoActualizada,
    }); // Si la petición es satisfactoria devuelvo mensaje exitoso y el data
  } catch (error) {
    console.error("Error al actualizar el estado de la aplicativo:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado de la aplicativo.",
    }); // Si hay un catch devuelvo 500 y un mensaje
  }
};