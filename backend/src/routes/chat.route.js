import {Router} from 'express';
import { tokenVerification } from '../middlewares/auth.middleware.js';
import {sendMessagesController} from '../controllers/chat.controller.js'

const chatRouter = Router();

chatRouter.post('/message', tokenVerification, sendMessagesController);

export default chatRouter;