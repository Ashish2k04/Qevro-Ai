import { askAi, generateChatTitle } from '../services/ai.service.js';
import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';

export async function sendMessagesController(req,res,next) {
    try{
    const {message, chatId} = req.body;
    const {id} = req.user;

    const aiReply = await askAi(message);

    const chatTitles = null;
    const aiTitle = null;

    if(!chatId){
       aiTitle = await generateChatTitle(message);
       chatTitles = await chatModel.create({
           user: id, 
           title: aiTitle
       });  
    }

    const aiMessage = await messageModel.create({
        chat: chatTitles._id,
        content: aiReply,
        role: "ai"
    })

    const userMessage = await messageModel.create({
        chat: chatTitles._id,
        content: message,
        role: "user"
    })

    return res.status(201).json({
        message: "Reply of your message is created successfully.",
        success: true,
        title: aiTitle,
        answer: aiReply,
        chatTitles,
        aiMessage,
        userMessage
    });
   }
   catch(err){
      err.status = 500;
      next(err)
   }
};