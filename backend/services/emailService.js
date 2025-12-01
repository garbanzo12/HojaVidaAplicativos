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

export async function sendResetEmail(email, token) {
    const resetUrl = `http://localhost:3000/cambiar-password?token=${token}`;

    const mailOptions = {
        from: '"ABAI Soporte" <atencion.soporte09@gmail.com>',
        to: email,
        subject: 'Recuperación de Contraseña',

        html: `
            <div style="text-align:center;">
                <img src="cid:logoAbai" style="width:150px; margin-bottom:20px;" />
                <h2>Restablecer Contraseña</h2>
                <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>El enlace expira en 1 hora.</p>
            </div>
        `,

        attachments: [
            {
                filename: 'logo-abai.png',
                path: 'services/logo-abai.png',  // Estoy dandole la ruta de la imagen para que la logre procesar
                cid: 'logoAbai' 
            }
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${email}`);
    } catch (error) {
        console.error('Error al enviar correo:', error);
        throw new Error('No se pudo enviar el correo de recuperación.');
    }
}
