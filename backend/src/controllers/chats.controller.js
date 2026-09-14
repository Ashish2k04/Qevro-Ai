import { askAi, generateChatTitle } from '../services/ai.service.js';
import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';

export async function sendMessagesController(req,res,next) {
    try{
    const {message, chatId} = req.body;
    const {id} = req.user;

    const aiReply = await askAi(message); //Ai answer bana 1

    let chatTitles = null;
    let aiTitle = null;

    //agar req.body me chatId nahi aata hai tabhi new banake save krna h
    if(!chatId){ 
          aiTitle = await generateChatTitle(message);
          chatTitles = await chatModel.create({
              user: id, 
              title: aiTitle
          });  

          //Ai answer chat me save hua
       const aiMessage = await messageModel.create({
           chat: chatId,
           content: aiReply,
           role: "ai"
       })

       //User ka message chat me save hua
       const userMessage = await messageModel.create({
           chat: chatId,
           content: message,
           role: "user"
       })
   }

   chatTitles = await chatModel({_id: chatId});

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