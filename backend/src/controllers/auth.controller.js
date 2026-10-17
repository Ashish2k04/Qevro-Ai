import 'dotenv/config';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../services/mail.service.js';
import messageModel from '../models/message.model.js';

/*
@route POST /api/register
@desc Get user registerd.
@access public.
*/
async function registerCtrl(req, res, next) {

    try {

        const { username, email, password } = req.body;

        const isExists = await userModel.findOne({

            $or: [

                { username },

                { email }
            ]
        });

        if (isExists) {

            return res.status(409).json({

                success: false,

                error: "User already exists"
            });
        };

        const created = await userModel.create({
            username, email, password
        });

        const token = jwt.sign(
            { email: created.email },
            process.env.JWT_SECRET
        );

        await sendEmail({

            to: created.email,

            subject: "Welcome to Qevro-Ai",

            html: `<p>Hello ${created.username}</p>
            <p>Thank you for registering at <strong>Qevro-Ai</strong>, We're exicted to have you on board! 🥳</p>
            <p>Please verify your email address by clicking the link below:</p>

            <a href="${process.env.BACKEND_URI || 'https://qevro-ai.onrender.com'}/api/verify-email?token=${token}">
                Verify Email.
            </a>

            <p>If you did not created an account, please ignore this email.</p>
            <p>Best regards, <br>The Qevro-Ai Team</p>`
        })

        return res.status(201).json({

            message: 'User created!',

            success: true,

            info: {

                user: created.username,

                email: created.email,

                verified: created.verified
            }
        });
    }

    catch (err) {

        err.status = 500;

        next(err);
    }
};

/*
@route POST /api/login
@desc Get user loggedin.
@access public.
*/
async function loginCtrl(req, res, next) {
    try {
        const { email, password } = req.body;

        const isUserExists = await userModel.findOne({ email });

        if (!isUserExists) {
            return res.status(404).json({
                message: "User don't exists.",
                success: false
            })
        }

        const decodePassword = await isUserExists.comparePassword(password);

        if (!decodePassword) {
            return res.status(400).json({
                message: "Invalid Email or Password.",
                success: false
            })
        }

        if (!isUserExists.verified) {
            return res.status(403).json({
                message: "Please verify your email before loggin.",
                success: false
            })
        }

        const token = jwt.sign({ id: isUserExists._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Loggin Successful.",
            success: true,
            info: {
                username: isUserExists.username,
                email: isUserExists.email
            }
        })
    }
    catch (err) {
        err.status = 500;
        next(err);
    }
}

/*
@route GET /api/verify-email
@desc Get user email verified.
@access private.
*/
async function verifyEmail(req, res, next) {

    try {

        const { token } = req.query;

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            email: decode.email
        });

        if (!user) {

            return res.status(400).json({

                message: "Invalid token.",

                success: false,

                error: "User not found"
            })
        }

        user.verified = true;

        await user.save()

        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Email Verified — Qevro-AI</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
          <style>
            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: 'Inter', sans-serif;
              min-height: 100vh;
              background-color: #111827;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 1.5rem;
            }
            .card {
              background-color: #1f2937;
              border: 1px solid #374151;
              border-radius: 1.25rem;
              padding: 2.5rem 2rem;
              max-width: 420px;
              width: 100%;
              text-align: center;
              box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            }
            .icon-wrap {
              width: 64px;
              height: 64px;
              background: rgba(99,102,241,0.15);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 1.5rem;
            }
            .icon-wrap svg { width: 32px; height: 32px; color: #818cf8; }
            .logo {
              font-size: 1.125rem;
              font-weight: 600;
              color: #fff;
              margin-bottom: 1.75rem;
              letter-spacing: -0.02em;
            }
            .logo span { color: #818cf8; }
            h1 {
              font-size: 1.375rem;
              font-weight: 600;
              color: #fff;
              letter-spacing: -0.02em;
              margin-bottom: 0.625rem;
            }
            p {
              font-size: 0.875rem;
              color: #9ca3af;
              line-height: 1.6;
              margin-bottom: 2rem;
            }
            .btn {
              display: inline-block;
              width: 100%;
              padding: 0.75rem 1.5rem;
              background: #4f46e5;
              color: #fff;
              font-size: 0.875rem;
              font-weight: 500;
              border-radius: 0.625rem;
              text-decoration: none;
              transition: background 0.2s;
            }
            .btn:hover { background: #6366f1; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="logo">Qevro<span>Ai.</span></div>
            <div class="icon-wrap">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1>Email Verified!</h1>
            <p>Your email has been verified successfully.<br />You can now log in to your Qevro-AI account.</p>
            <a class="btn" href="${process.env.FRONTEND_URI || 'https://qevro-ai.vercel.app'}/login">Login to your account</a>
          </div>
        </body>
        </html>
      `);

    }

    catch (err) {

        err.status = 500;

        next(err)
    }

}

async function getMeController(req, res, next) {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
                error: "Invalid or missing token."
            })
        }
        return res.status(200).json({
            message: "User fetched.",
            success: true,
            info: {
                username: user.username,
                email: user.email
            }
        })
    }
    catch (err) {
        err.status = 500;
        next(err)
    }
}

async function logOutController(req, res, next) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "User logout successfully.",
            success: true
        })
    }
    catch (err) {
        err.status = 500;
        next(err)
    }
}


export {
    registerCtrl, verifyEmail, loginCtrl,
    getMeController, logOutController
};
