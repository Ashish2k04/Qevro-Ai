import { askAi, generateChatTitle } from '../services/ai.service.js';
import chatModel from '../models/chat.model.js';

export async function sendMessagesController(req,res,next) {
    try{
    const {message} = req.body;
    const {id} = req.user;

    const [ai_reply, ai_Title] = await Promise.all([
        askAi(message),
        generateChatTitle(message)
    ]);

    await chatModel.create({user: id, title: ai_Title});

    return res.status(201).json({
        message: "Reply of your message is created successfully.",
        success: true,
        title: ai_Title,
        answer: ai_reply
    });
   }
   catch(err){
      err.status = 500;
      next(err)
   }
};