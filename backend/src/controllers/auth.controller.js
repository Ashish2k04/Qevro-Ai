import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
                message: "User already exists.",
                success: false,
                err: "User already exists"
            });
        };

        const created = await userModel.create({
            username, email, password
        });

        const token = jwt.sign({id: created._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie('token', token);

    return res.status(201).json({
        message: 'User created!',
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

export {registerCtrl};