import { askAi, generateChatTitle } from '../services/ai.service.js';

export async function sendMessagesController(req,res,next) {
    try{
    const {message} = req.body;
    const ai_reply = await askAi(message);
    const ai_Title = await generateChatTitle(message);

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