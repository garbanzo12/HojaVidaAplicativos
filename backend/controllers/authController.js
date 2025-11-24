import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    const validarPassword = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );

    if (!validarPassword) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    // Crear token
    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol,
        correo: usuario.correo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre_completo: usuario.nombre_completo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
