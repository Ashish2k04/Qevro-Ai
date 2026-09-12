import { askAi } from '../services/ai.service.js';

export async function sendMessagesController(req,res,next) {
    try{
    const {message} = req.body;
    const ai_answer = await askAi(message);

    return res.status(201).json({
        message: "Reply of your message is created successfully.",
        success: true,
        answer: ai_answer
    });
   }
   catch(err){
      err.status = 500;
      next(err)
   }
};