// Import the user model so we can interact with users in the database (50)
import userModel from '../models/user.model.js';

// Import jsonwebtoken so we can create and verify JWT tokens (51)
import jwt from 'jsonwebtoken';

// Load environment variables from the .env file (52)
import 'dotenv/config';

// Import the reusable function used to send emails (26)
import { sendEmail } from '../services/mail.service.js';

// Create an async controller to handle user registration (53)
async function registerCtrl(req,res,next) {

    // Try to register the user and handle any errors (54)
    try{

        // Get username, email, and password from the request body (55)
        const {username, email, password} = req.body;

        // Check whether a user already exists with the same username or email (56)
        const isExists = await userModel.findOne({

            // Check both username and email (57)
            $or: [

                // Check for a matching username (58)
                {username},

                // Check for a matching email (59)
                {email}
            ]
        });

        // If the user already exists, send a conflict response (60)
        if(isExists){

            return res.status(409).json({

                // Show that the request was not successful (61)
                success: false,

                // Send an error message (62)
                error: "User already exists"
            });
        };

        // Create a new user in the database (63)
        const created = await userModel.create({
            username, email, password
        });

        // Create a JWT containing the user's email for email verification (64)
        const token = jwt.sign(
            {email: created.email},
            process.env.JWT_SECRET
        );

        // Send a welcome and email verification message to the new user (65)
        await sendEmail({

            // Send the email to the newly created user's email address (66)
            to: created.email,

            // Set the email subject (67)
            subject: "Welcome to Qevro-Ai",

            // Create the HTML content of the verification email (68)
            html: `<p>Hello ${created.username}</p>
            <p>Thank you for registering at <strong>Qevro-Ai</strong>, We're exicted to have you on board! 🥳</p>
            <p>Please verify your email address by clicking the link below:</p>

            <a href="http://localhost:3000/api/verify-email?token=${token}">
                Verify Email.
            </a>

            <p>If you did not created an account, please ignore this email.</p>
            <p>Best regards, <br>The Qevro-Ai Team</p>`
        })

    // Send a successful response after creating the user (69)
    return res.status(201).json({

        // Send a success message (70)
        message: 'User created!',

        // Show that the request was successful (71)
        success: true,

        // Send selected information about the created user (72)
        info: {

            // Send the username (73)
            user: created.username,

            // Send the email address (74)
            email: created.email,

            // Send the email verification status (75)
            verified: created.verified
        }
    });
    }

    // Pass any error to Express error-handling middleware (76)
    catch(err){

        // Set the error status code (77)
        err.status = 500;

        // Pass the error to the next middleware (78)
        next(err);
    }
};

// Create an async controller to verify the user's email (79)
async function verifyEmail(req,res,next) {

   // Try to verify the token and user (80)
   try{

      // Get the JWT token from the URL query parameters (81)
      const {token} = req.query;

      // Verify and decode the JWT using the JWT secret (82)
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user whose email is stored inside the JWT (83)
      const user = await userModel.findOne({
        email: decode.email
      });

      // If no user is found, the token cannot be used for verification (84)
      if(!user){

        return res.status(400).json({

            // Send an invalid token message (85)
            message: "Invalid token.",

            // Show that the request was unsuccessful (86)
            success: false,

            // Explain that the user was not found (87)
            error: "User not found"
        })
      }

      // Mark the user's email as verified (88)
      user.verified = true;

      // Save the updated user information in the database (89)
      await user.save()

      // Send a success message in the browser after verification (90)
      res.send(`
       <p>Email verified successfuly.</p>    
       <p>Your email has been verified, You can now login to your account.</p>
      `);

   }

   // Pass any error to Express error-handling middleware (91)
   catch(err){

    // Set the error status code (92)
    err.status = 500;

    // Pass the error to the next middleware (93)
    next(err)
   }

}

// Export both controllers so routes can use them (94)
export {registerCtrl, verifyEmail};