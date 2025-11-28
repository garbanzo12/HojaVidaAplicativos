import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    host: process.env.BREVO_HOST,
    port: process.env.BREVO_PORT,
    secure: false, 
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
    },
});


/**
 * Función para enviar el correo de recuperación
 */
export async function sendResetEmail(email, token) {
    const resetUrl = `http://localhost:4000/auth/reset-password?token=${token}`;

    const mailOptions = {
        from: '"ABAI Soporte" <atencion.soporte09@gmail.com>',  // 👈 CORRECTO
        to: email,
        subject: 'Recuperación de Contraseña',
        html: `
            <h2>Restablecer Contraseña</h2>
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>El enlace expira en 1 hora.</p>
        `,
    };


    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${email}`);
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw new Error('No se pudo enviar el correo de recuperación.');
    }
}
