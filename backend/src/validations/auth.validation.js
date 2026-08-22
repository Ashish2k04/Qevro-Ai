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


export const validate = [
    body('username').isString().withMessage('Invalid username format!'),
    body('email').isEmail().withMessage('Invalid email format it should be test@example.com'),
    body('password').isLength({min: 6, max: 12}).withMessage('Password Should be 6 to 12 characters long!'),
    authValidation
];

