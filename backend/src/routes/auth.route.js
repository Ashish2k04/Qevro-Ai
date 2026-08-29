import {Router} from 'express';
import {registerCtrl, verifyEmail, loginCtrl} from '../controllers/auth.controller.js'
import {Registervalidator, Loginvalidator} from '../validations/auth.validation.js'

const authRouter = Router();

authRouter.post('/register', Registervalidator, registerCtrl);
authRouter.post('/login', Loginvalidator, loginCtrl);
authRouter.get('/verify-email', verifyEmail);

export default authRouter;

