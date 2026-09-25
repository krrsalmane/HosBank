import nodemailer from "nodemailer";

const shouldSendEmails = !(process.env.NODE_ENV === 'test' || process.env.DISABLE_EMAIL_SENDING === 'true');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export async function sendVerificationEmail(email, token) {
    if (!shouldSendEmails) {
        return;
    }

    const appUrl = (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');
    const verificationUrl =
        `${appUrl}/auth/verify-email?token=${encodeURIComponent(token)}`;

    await transporter.sendMail({
        from: `"SmartBank" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify your SmartBank email',
        html: `
            <h2>Welcome to SmartBank</h2>
            <p>Thank you for creating your account.</p>
            <p>Verify your email address to activate your account and go to your dashboard.</p>
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
                    Verify email and open my dashboard
                </a>
            </p>
            <p>This link expires in 24 hours. After verification, you will be signed in and redirected to your dashboard.</p>
            <p>If the button does not work, open this link: <a href="${verificationUrl}">${verificationUrl}</a></p>`
    });
}
