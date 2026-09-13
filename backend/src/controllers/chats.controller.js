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

    const chat = await chatModel.create({
        user: id, 
        title: ai_Title
    });

    const response = await messageModel.create({
        chat: chat._id,
        content: ai_reply,
        role: "ai"
    })

    return res.status(201).json({
        message: "Reply of your message is created successfully.",
        success: true,
        title: ai_Title,
        answer: ai_reply,
        chat,
        response
    });
   }
   catch(err){
      err.status = 500;
      next(err)
   }
};