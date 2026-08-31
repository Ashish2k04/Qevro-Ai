import {body, validationResult} from 'express-validator';


const authValidation = function(req,res,next){
    const error = validationResult(req);

    if(error.isEmpty()){
        return next()
    };

    return res.status(200).json({
        error: error.array()
    });
}


export const Registervalidator = [
    body('username').trim().notEmpty().withMessage('Username is required!').matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers and underscores").isLength({min: 3, max: 30}).withMessage('Minimum 3 and Maximum 30 characters required!'),
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid email format it should be test@example.com'),
    body('password').notEmpty().withMessage('Password is Required!').isLength({min: 6, max: 12}).withMessage('Password Should be 6 to 12 characters long!'),
    authValidation
];

export const Loginvalidator = [
    body('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Invalid email format it should be test@example.com'),
    body('password').notEmpty().withMessage('Password is Required!').isLength({min: 6, max: 12}).withMessage('Password Should be 6 to 12 characters long!'),
    authValidation
];



 