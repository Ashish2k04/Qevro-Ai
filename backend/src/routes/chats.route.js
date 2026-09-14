import {Router} from 'express';
import { tokenVerification } from '../middlewares/auth.middleware.js';
import {sendMessagesController, getChats} from '../controllers/chats.controller.js'

const chatRouter = Router();

chatRouter.post('/message', tokenVerification, sendMessagesController);
chatRouter.post('/get-chats', tokenVerification, getChats);

export default chatRouter;