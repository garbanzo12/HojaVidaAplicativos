import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResetEmail } from '../services/emailService.js'; // Importa la función de envío
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



export async function forgotPassword(req, res) {
    const { email } = req.body;

    try {
        // 1. Verificar Usuario
        const usuario = await prisma.usuario.findUnique({ where: { correo  : email} });
        console.log(usuario)
        // Si no se encuentra el usuario, devuelve un mensaje genérico por seguridad.
        if (!usuario) {
            return res.status(404).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' });
        }

        // 2. Generar Token (Validez de 1 hora = 3600 segundos)
        const token = jwt.sign(
            { userId: usuario.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Esto establece la expiración en el JWT
        );
        
        // Calcular la fecha de expiración para Prisma (1 hora después)
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 minutos * 60 segundos * 1000 ms

        // 3. Guardar Token en DB
        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                resetToken: token,
                resetTokenExpires: expiresAt,
            },
        });

        // 4. Enviar Correo
        await sendResetEmail(usuario.correo, token);
        
        // Respuesta al cliente
        return res.status(200).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' });

    } catch (error) {
        console.error('Error en forgotPassword:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
}



const SALT_ROUNDS = 10; // Para el hashing

export async function resetPassword(req, res) {
    const { token, newPassword } = req.body;

    // 1. Verificar datos
    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token y nueva contraseña son requeridos.' });
    }
    console.log(token," |||||| ", newPassword)
    try {
        // 2. Buscar y Validar Token
        const usuario = await prisma.usuario.findFirst({
            where: {
                resetToken: token,
                // Verifica que la expiración sea en el futuro (mayor al tiempo actual)
                resetTokenExpires: {
                    gt: new Date(), 
                },
            },
        });
        console.log(usuario)
        if (!usuario) {
            return res.status(400).json({ message: 'El enlace de recuperación es inválido o ha expirado.' });
        }

        // 3. Hashear la Nueva Contraseña
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

        // 4. Actualizar Contraseña e Invalidar Token
        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                contrasena: hashedPassword, // Nueva contraseña hasheada
                resetToken: null,         // Limpiar el token
                resetTokenExpires: null,  // Limpiar la expiración
            },
        });

        // 5. Respuesta
        return res.status(200).json({ message: 'Contraseña restablecida con éxito.' });

    } catch (error) {
        console.error('Error en resetPassword:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    }
}