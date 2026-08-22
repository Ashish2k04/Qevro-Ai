import {Router} from 'express';
import {registerCtrl} from '../controllers/auth.controller.js'
import {validate} from '../validations/auth.validation.js'

const authRouter = Router();

authRouter.post('/register', validate, registerCtrl);

export default authRouter;

