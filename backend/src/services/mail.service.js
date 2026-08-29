import 'dotenv/config'
import {createTransport} from 'nodemailer';

const transporter = createTransport({
    service: 'gmail',
    auth:{
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

transporter.verify()
.then(()=>{
    console.log('Email transporter is ready to send emails.')
})
.catch((err)=>{
   console.log(`Something went wrong in email transporter: ${err.message}`)
})

export async function sendEmail({to, subject, html, text}) {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);

}