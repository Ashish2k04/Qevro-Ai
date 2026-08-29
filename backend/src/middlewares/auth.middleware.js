import 'dotenv/config'
import jwt from 'jsonwebtoken';

export async function tokenVerification(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(404).json({
            message: "Unauthorized.",
            success: false,
            error: "No token provided."
        })
    }

    try{
        let decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode

        next()
    }
    catch(err){
       err.status = 500;
       next(err)
    }
  
}
