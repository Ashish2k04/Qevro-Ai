import {Router} from 'express';
import {registerCtrl, verifyEmail, loginCtrl, getMeController, resetPasswordController} from '../controllers/auth.controller.js'
import {Registervalidator, Loginvalidator} from '../validations/auth.validation.js'
import {tokenVerification} from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', Registervalidator, registerCtrl);
authRouter.post('/login', Loginvalidator, loginCtrl);
authRouter.get('/verify-email', verifyEmail);
authRouter.get('/get-me', tokenVerification, getMeController);
authRouter.patch('/update-password', tokenVerification, resetPasswordController);

export default authRouter;

