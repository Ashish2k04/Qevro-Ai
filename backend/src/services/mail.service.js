import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, text }) {
    const { data, error } = await resend.emails.send({
        from: 'Qevro-AI <onboarding@resend.dev>',
        to,
        subject,
        html,
        text
    });

    if (error) {
        throw new Error(error.message);
    }

    console.log('Email sent:', data?.id);
}
