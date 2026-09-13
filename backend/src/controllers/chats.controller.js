import { askAi, generateChatTitle } from '../services/ai.service.js';
import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';

export async function sendMessagesController(req,res,next) {
    try{
    const {message} = req.body;
    const {id} = req.user;

    const [ai_reply, ai_Title] = await Promise.all([
        askAi(message),
        generateChatTitle(message)
    ]);

    const chatTitles = await chatModel.create({
        user: id, 
        title: ai_Title
    });

    const aiMessage = await messageModel.create({
        chat: chatTitles._id,
        content: ai_reply,
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
        title: ai_Title,
        answer: ai_reply,
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