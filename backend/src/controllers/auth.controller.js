import 'dotenv/config';
import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../services/mail.service.js';

/*
@route POST /api/register
@desc Get user registerd.
@access public.
*/
async function registerCtrl(req,res,next) {

    try{

        const {username, email, password} = req.body;

        const isExists = await userModel.findOne({

            $or: [

                {username},

                {email}
            ]
        });

        if(isExists){

            return res.status(409).json({

                success: false,

                error: "User already exists"
            });
        };

        const created = await userModel.create({
            username, email, password
        });

        const token = jwt.sign(
            {email: created.email},
            process.env.JWT_SECRET
        );

        await sendEmail({

            to: created.email,

            subject: "Welcome to Qevro-Ai",

            html: `<p>Hello ${created.username}</p>
            <p>Thank you for registering at <strong>Qevro-Ai</strong>, We're exicted to have you on board! 🥳</p>
            <p>Please verify your email address by clicking the link below:</p>

            <a href="http://localhost:3000/api/verify-email?token=${token}">
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

    catch(err){

        err.status = 500;

        next(err);
    }
};

/*
@route POST /api/login
@desc Get user loggedin.
@access public.
*/
async function loginCtrl(req,res,next){
    try{
        const {email, password} = req.body;

        const isUserExists = await userModel.findOne({email});

        if(!isUserExists){
            return res.status(404).json({
                message: "User don't exists.",
                success: false
            })
        }

        const decodePassword = await isUserExists.comparePassword(password);

        if(!decodePassword){
            return res.status(400).json({
                message: "Invalid Email or Password.",
                success: false
            })
        }

        if(!isUserExists.verified){
             return res.status(403).json({
                message: "Please verify your email before loggin.",
                success: false
            })
        }

        const token = jwt.sign({id: isUserExists._id, username: isUserExists.username}, process.env.JWT_SECRET, {expiresIn: "7d"});

        res.cookie("token", token);

        return res.status(200).json({
            message: "Loggin Successful.",
            success: true,
            info: {
                username: isUserExists.username,
                email: isUserExists.email
            }
        })
    }
    catch(err){
        err.status = 500;
        next(err);
    }
}

/*
@route GET /api/verify-email
@desc Get user email verified.
@access private.
*/
async function verifyEmail(req,res,next) {

   try{

      const {token} = req.query;

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const user = await userModel.findOne({
        email: decode.email
      });

      if(!user){

        return res.status(400).json({

            message: "Invalid token.",

            success: false,

            error: "User not found"
        })
      }

      user.verified = true;

      await user.save()

      res.send(`
       <p>Email verified successfuly.</p>    
       <p>Your email has been verified, You can now login to your account.</p>
      `);

   }

   catch(err){

    err.status = 500;

    next(err)
   }

}

async function getMeController(req,res,next) {
    try{
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if(!user){
        return res.status(404).json({
            message: "User not found.",
            success: false,
            error: "Invalid or missing token."
        })
    }
    return res.status(200).json({
        message: "User fetched.",
        success: true,
        user
    })
}
  catch(err){
    err.status = 500;
    next(err)
  }
}


export {registerCtrl, verifyEmail, loginCtrl, getMeController};

upd