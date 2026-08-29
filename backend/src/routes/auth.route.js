import {Router} from 'express';
import {registerCtrl, verifyEmail} from '../controllers/auth.controller.js'
import {validate} from '../validations/auth.validation.js'

const authRouter = Router();

authRouter.post('/register', validate, registerCtrl);
authRouter.get('/verify-email', verifyEmail);

export default authRouter;

