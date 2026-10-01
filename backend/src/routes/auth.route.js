import {Router} from 'express';
import {registerCtrl, verifyEmail, loginCtrl, logOutController, getMeController} from '../controllers/auth.controller.js'
import {Registervalidator, Loginvalidator} from '../validations/auth.validation.js'
import {tokenVerification} from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', Registervalidator, registerCtrl);
authRouter.post('/login', Loginvalidator, loginCtrl);
authRouter.post('/logout', tokenVerification, logOutController);
authRouter.get('/verify-email', verifyEmail);
authRouter.get('/get-me', tokenVerification, getMeController);;

export default authRouter;

