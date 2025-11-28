// emailService.js o en tu archivo de configuración

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail', // O 'Outlook', 'Hotmail', etc.
    auth: {
        user: process.env.EMAIL_USER,    // Tu correo (ej: 'tucorreo@gmail.com')
        pass: process.env.EMAIL_PASS     // La contraseña de aplicación de Google
    }
});

/**
 * Función para enviar el correo de recuperación
 * @param {string} email - Correo del usuario
 * @param {string} token - Token de recuperación generado
 */
export async function sendResetEmail(email, token) {
    // URL donde el usuario aterrizará al hacer clic.
    // **Asegúrate de cambiar esto a la URL de tu frontend**
    const resetUrl = `http://localhost:4000/auth/reset-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperación de Contraseña',
        html: `
            <h1>Recuperación de Contraseña</h1>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace:</p>
            <p>El enlace expirará en 1 hora.</p>
            <a href="${resetUrl}">Restablecer Contraseña</a>
            <p>Si no solicitaste esto, ignora este correo.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${email}`);
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw new Error('No se pudo enviar el correo de recuperación.');
    }
}