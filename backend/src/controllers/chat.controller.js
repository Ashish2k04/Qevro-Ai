import { askAi } from '../services/ai.service.js';

export async function sendMessagesController(req,res,next) {
    try{
    const {question} = req.body;
    const ai_answer = await askAi(question);

    return res.status(201).json({
        message: "Your answer created successfully.",
        success: true,
        answer: ai_answer
    });
   }
   catch(err){
      err.status = 500;
      next(err)
   }
};