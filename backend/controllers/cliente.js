import { PrismaClient } from "@prisma/client"; // Estoy importanto el cliente de prisma
const prisma = new PrismaClient(); // Inicializo el cliente de prisma con una variable prisma

// ✅ Crear un cliente
export const createCliente = async (req, res) => { // Creo mi función de crear cliente
  try {
    const data = req.validatedData; // Valido el cuerpo de la petición
    const nuevoCliente = await prisma.cliente.create({ 
      data, // Creo mi nuevo cliente en base al cuerpo de la petición
    });

    res.status(201).json({
      success: true,
      message: "cliente creado exitosamente.",
      data: nuevoCliente, 
    }); // Si la petición es satisfactoria se muestra un mensaje de exito y el cuerpo
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el cliente.",
    }); // Si hay un catch se muestra 500 y un mensaje 
  }
};



//Obtener todos los clientes
export const getClientes = async (req, res) => { // Creo mi función para obtener mis clientes
  try {
    const clientes = await prisma.cliente.findMany({ 
      select: { id: true, nombre: true , estado : true }, // Busco todos los registros de mi clientes y devuelvo el id, nombre y el estado

    });
    res.json(clientes); // Si la petición es satisfactoria se devuelven los clientes
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener clientes.",
    }); // Si hay un catch se devuelve un 500 y un mensaje 
  }
};

export const getClientesDetalles = async (req, res) => {
  try {
    const cliente = await prisma.cliente.findMany({

    });

    res.json(cliente);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener clientes.",
    }); 
  } // Si hay un catch se devuelve un 500 con mensaje
};

// ✅ Obtener un cliente por ID
export const getCLienteById = async (req, res) => { // Creo mi función para obtener un cliente por su id
  try {
    const { id } = req.params; // Obtengo el id del cuerpo
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) }, // Busco el cliente segun el id
    });

    if (!cliente) {
      return res.status(404).json({ message: "cliente no encontrado." });
    } // Si no hay cliente se devuelve un 404 con mensaje

    res.json(cliente); // Si la petición es satisfactoria se devuelve el cliente
  } catch (error) {
    console.error("Error al obtener cliente:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el cliente.",
    });
  } // Si hay un catch se devuelve un 500 y un mensaje
};
