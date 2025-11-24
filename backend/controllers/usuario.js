import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🔹 Obtener todos los usuarios (opcionalmente filtrados por estado)
export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
   
    });
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// 🔹 Crear un usuario
export const createUsuario = async (req, res) => {
  try {
    const {
      nombre_completo,
      correo,
      tipo_documento,
      numero_documento,
      sede,
      rol,
    } = req.body;

    const usuario = await prisma.usuario.create({
      data: {
        nombre_completo,
        correo,
        tipo_documento,
        numero_documento,
        sede,
        rol,
      },
    });

    res.json(usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// 🔹 Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data,
    });

    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
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
    // 1️⃣ Buscar la campaña por ID
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });

    // 2️⃣ Si no existe, devolver error
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: "Campaña no encontrada.",
      });
    }

    // 3️⃣ Determinar el nuevo estado
    const nuevoEstado =
      usuario.estado === "HABILITADO" ? "DESHABILITADO" : "HABILITADO";

    // 4️⃣ Actualizar en base de datos
    const usuarioActualizada = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { estado: nuevoEstado },
    });

    // 5️⃣ Responder con éxito
    res.json({
      success: true,
      message: `Estado actualizado a ${nuevoEstado}`,
      data: usuarioActualizada,
    });
  } catch (error) {
    console.error("Error al actualizar el estado de la campaña:", error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el estado de la campaña.",
    });
  }
};