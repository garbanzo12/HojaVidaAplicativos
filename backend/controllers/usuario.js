import { PrismaClient } from "@prisma/client"; // Estoy importanto el cliente de prisma
const prisma = new PrismaClient(); // Inicializo el cliente de prisma con una variable prisma


import bcrypt from "bcryptjs";
import { usuarioSchemaCrear } from "../validators/usuarioValidator.js";
import { usuarioSchemaEditar } from "../validators/usuarioValidator.js";




// 🔹 Crear un usuario (con hashing)
export const createUsuario = async (req, res) => { // Creo mi función de crear usuario
  try {
    
    const validatedData = usuarioSchemaCrear.parse(req.body); // Valida  los datos con el validator

    
    validatedData.contrasena = await bcrypt.hash(validatedData.contrasena, 10); // Se Hashea la contraseña

   
    const usuario = await prisma.usuario.create({
      data: validatedData, // Se crea el registro en la bd
    });

    res.json(usuario); // Si la petición es satisfactoria se devuelve el usuario

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Error de validación",
        detalles: error.errors,
      }); // Si hay un error de zod, es decir, de validación, se devuelve un 400
    }

    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  } // Si hay un catch se devuelve un 500 y un mensaje 
};


//Obtener todos los usuarios 
export const getUsuarios = async (req, res) => { // Creo mi función para obtener mis usuarios
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        campana: true,
      }, // Se buscan todos los usuarios y se incluyen las campañas que esten relacionadas con cada usuario
    });
    res.json(usuarios); // Si la petición es satisfactoria se devuelven los usuarios
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  } // Si hay un catch se devuelve un 500 con mensaje
};


//  Actualizar un usuario
export const actualizarUsuario = async (req, res) => { // Creo mi función para actualizar usuario 
  try {
    const { id } = req.params; // Obtengo el id del cuerpo

    
    const validatedData = usuarioSchemaEditar.parse(req.body); // Valido los datos desde mi validator

    if (validatedData.contrasena) {
      validatedData.contrasena = await bcrypt.hash(validatedData.contrasena, 10); // Si el usuario actializa contraseña esta se hashea
    }

    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: validatedData,
    }); // Se actializa el usuario segun su id y el data

    res.json(usuario); // Se devuelve el usuario

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Error de validación",
        detalles: error.errors,
      }); // Si hay un error de zod, es decir, de validación se devuelve un 400
    }

    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({ error: "Error al actualizar usuario" });
  }
};



// Obtener usuarios por campaña
export const getUsuariosPorCampana = async (req, res) => { // Creo mi función para obtener usuario segun una campaña
  try {
    const { campanaId } = req.params; // Obtengo el id de campaña del cuerpo 

    const usuarios = await prisma.usuario.findMany({
      where: { campanaId: Number(campanaId) }, // Obtengo el usuario segun el id de campaña
    });

    res.json(usuarios); // Devuelve el usuario 
  } catch (error) {
    console.error("Error al obtener usuarios por campaña:", error);
    res.status(500).json({ error: "Error al obtener usuarios por campaña" });
  } // Si hay un catch devuelvo 500 y un mensaje
};

export const updateEstadoUsuario = async (req, res) => { // Creo mi función para actualizar usuario
  const { id } = req.params; // Obtengo el id del cuerpo

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) }, 
    }); // Busco el usuario segun el id

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    } // Si no se encuentra usuario se devuelve 400

    const nuevoEstado =
      usuario.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO"; // Se cambia el estado del usuario

    const usuarioActualizada = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    }); // Se actualiza el usuario segun su id y estado

    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: usuarioActualizada,
    }); // Si la petición fue satisfactoria se devuelve mensaje exitoso y el data
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado del usuario.",
    }); // Si hay un catch devuelvo 500 y un mensaje
  }
};



export const me = async (req, res) => { // Hago una función para que un usuario se obtenga a si mismo
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
    }); // Busco un usuario segun su id

    res.json({ usuario }); // Si hay usuario se devuelve como un objeto
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuario" });
  } // Si hay un catch se devuelve 500 y mensaje de error
};
