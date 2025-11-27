


import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { usuarioSchemaCrear } from "../validators/usuarioValidator.js";
import { usuarioSchemaEditar } from "../validators/usuarioValidator.js";

const prisma = new PrismaClient();

// 🔹 Obtener todos los usuarios (opcionalmente filtrados por estado)
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        campana: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// 🔹 Crear un usuario (con hashing)
export const createUsuario = async (req, res) => {
  try {
    // 🔍 1) Validar
    const validatedData = usuarioSchemaCrear.parse(req.body);

    // 🔐 2) Hashear contraseña
    validatedData.contrasena = await bcrypt.hash(validatedData.contrasena, 10);

    // 📝 3) Guardar en BD
    const usuario = await prisma.usuario.create({
      data: validatedData,
    });

    res.json(usuario);

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Error de validación",
        detalles: error.errors,
      });
    }

    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// 🔹 Actualizar un usuario (con hashing opcional)

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔍 Validar parcialmente
    const validatedData = usuarioSchemaEditar.parse(req.body);

    // 🔐 Si viene contraseña, hashearla
    if (validatedData.contrasena) {
      validatedData.contrasena = await bcrypt.hash(validatedData.contrasena, 10);
    }

    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: validatedData,
    });

    res.json(usuario);

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Error de validación",
        detalles: error.errors,
      });
    }

    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// 🔹 Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

// 🔹 Obtener usuarios por campaña
export const getUsuariosPorCampana = async (req, res) => {
  try {
    const { campanaId } = req.params;

    const usuarios = await prisma.usuario.findMany({
      where: { campanaId: Number(campanaId) },
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios por campaña:", error);
    res.status(500).json({ error: "Error al obtener usuarios por campaña" });
  }
};

export const updateEstadoUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado.",
      });
    }

    const nuevoEstado =
      usuario.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    const usuarioActualizada = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    });

    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: usuarioActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado del usuario.",
    });
  }
};



export const me = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.id },
    });

    res.json({ usuario });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};
