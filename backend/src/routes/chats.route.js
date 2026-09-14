import {Router} from 'express';
import { tokenVerification } from '../middlewares/auth.middleware.js';
import {sendMessagesController, getChats, getMessages} from '../controllers/chats.controller.js'

const chatRouter = Router();

chatRouter.post('/message', tokenVerification, sendMessagesController);
chatRouter.get('/get-chats', tokenVerification, getChats);
chatRouter.get('/get-messages', tokenVerification, getMessages);

export default chatRouter;