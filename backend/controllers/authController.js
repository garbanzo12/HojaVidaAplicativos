import { PrismaClient } from "@prisma/client"; // Estoy importanto el cliente de prisma
const prisma = new PrismaClient(); // Inicializo el cliente de prisma con una variable prisma
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResetEmail } from '../services/emailService.js'; // Importa la función de envío

export const login = async (req, res) => { // Creo mi función de login
  try {
    const { correo, contrasena } = req.body; // Obtengo el correo y contraseña del cuerpo

    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    }); // Se busca un usuario que coincida con el correo

    if (!usuario) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    } // Si no se encuentra un usuario se muestra un mensaje

    const validarPassword = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    ); // Se valida la contraseña con la contraseña en la bd por medio de bcrypt

    if (!validarPassword) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    } // Si no coinciden se devuelve error

    // Crear token
    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol,
        correo: usuario.correo,
        nombre_completo : usuario.nombre_completo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    ); // Una vez el login sea correcto se crea el token y dentro de el agrego, id, rol, correo y nombre del usuario
 
    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre_completo: usuario.nombre_completo,
        rol: usuario.rol,
      }, // Si la petición es exitosa devuelvo un mensaje de exito junto al usuario
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  } // Si hay un catch devuelvo 500 y un mensaje
};



export async function forgotPassword(req, res) { // Creo mi funcion de olvidar contraseña
    const { email } = req.body; // Obtengo el correo del cuerpo

    try {
        //  Verificao Usuario
        const usuario = await prisma.usuario.findUnique({ where: { correo  : email} });
        console.log(usuario)
        if (!usuario) {
            return res.status(404).json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' });
        } // Si no se encuentra el usuario, devuelve un 


        // Genero un  Token (Validez de 1 hora 
        const token = jwt.sign(
            { userId: usuario.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Esto establece la expiración en el JWT
        );
        
        // Calculo la fecha de expiración para Prisma 
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 minutos * 60 segundos * 1000 ms

       
        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                resetToken: token,
                resetTokenExpires: expiresAt,
            },
        }); //  Guardo el Token en DB

        
        await sendResetEmail(usuario.correo, token); //  Envio el correo
        
        
        return res.json({ message: 'Si el correo existe, recibirás un enlace de recuperación.' }); // Envio un mensaje de exito

    } catch (error) {
        console.error('Error en forgotPassword:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    } // Si hay un catch devuelvo 500 y un mensaje
}



const SALT_ROUNDS = 10; // Para el hashing

export async function resetPassword(req, res) { // Creo mi funcion para resetear contraseña
    const { token, newPassword } = req.body; // Obtengo el token y la nueva contraseña desde el body

    
    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token y nueva contraseña son requeridos.' });
    } //  Verifico que el token y la contraseña exitan


    try {
        const usuario = await prisma.usuario.findFirst({
            where: {
                resetToken: token,
                resetTokenExpires: { // Verifico que la expiración sea en el futuro (mayor al tiempo actual)
                    gt: new Date(), 
                },
            }, 
        });
        if (!usuario) {
            return res.status(400).json({ message: 'El enlace de recuperación es inválido o ha expirado.' });
        } // Si el usuario no se encontró se devuelve 400 y un mensaje

        
        const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS); //  Hasheo la Nueva Contraseña

        await prisma.usuario.update({
            where: { id: usuario.id },
            data: {
                contrasena: hashedPassword, // Nueva contraseña hasheada
                resetToken: null,         // Limpiar el token
                resetTokenExpires: null,  // Limpiar la expiración
            }, // 4. Actualizo Contraseña e Invalidar Token

        });

       
        return res.json({ message: 'Contraseña restablecida con éxito.' }); // Si la petición es exitosa devuelvo mensaje de exito

    } catch (error) {
        console.error('Error en resetPassword:', error);
        return res.status(500).json({ message: 'Error interno del servidor.' });
    } // Si hay un catch devuelvo 500 y un mensaje
}