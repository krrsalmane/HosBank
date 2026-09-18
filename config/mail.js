import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function sendVerificationEmail(email, token) {

    const verificationUrl =
        `http://localhost:3000/auth/verify-email?token=${token}`;

    await transporter.sendMail({
        from: `"SmartBank" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your SmartBank email',
        html: `
            <h2>Welcome to SmartBank</h2>
            <p>Thank you for creating your account.</p>
            <p>Please verify your email address by clicking the button below.</p>
            <p>
                <a href="${verificationUrl}"
                    style="
                        display:inline-block;
                        padding:12px 20px;
                        background:#007bff;
                        color:white;
                        text-decoration:none;
                        border-radius:5px;
                    "
                >
                    Verify my email
                </a>
            </p>
            <p>This link expires in 24 hours.</p> `
    });
}