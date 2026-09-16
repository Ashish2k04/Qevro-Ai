import {Router} from 'express';
import { tokenVerification } from '../middlewares/auth.middleware.js';
import {sendMessages, getChats, getMessages, deleteChat} from '../controllers/chats.controller.js'

const chatRouter = Router();

chatRouter.post('/message', tokenVerification, sendMessages);
chatRouter.get('/get-chats', tokenVerification, getChats);
chatRouter.get('/get-messages/:chatId', tokenVerification, getMessages);
chatRouter.delete('/delete-chat/:chatId', tokenVerification, deleteChat);

export default chatRouter;