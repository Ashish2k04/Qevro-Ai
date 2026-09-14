import { askAi, generateChatTitle } from '../services/ai.service.js';
import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';

export async function sendMessagesController(req,res,next) {
    try{
        const {message, chatId} = req.body;
        const {id} = req.user;

        const aiReply = await askAi(message); //Ai answer bana 1

        let chatTitle = null;
        let aiTitle = null;
        let aiMessage = null;
        let userMessage = null;

    //agar req.body me chatId nahi aata hai tabhi new banake save krna h
    if(!chatId){ 
          aiTitle = await generateChatTitle(message);
          chatTitle = await chatModel.create({
              user: id, 
              title: aiTitle
          });  

          //Ai answer chat me save hua
          aiMessage = await messageModel.create({
           chat: chatTitle._id,
           content: aiReply,
           role: "ai"
       })

       //User ka message chat me save hua
          userMessage = await messageModel.create({
              chat: chatTitle._id,
              content: message,
              role: "user"
        })

        return res.status(201).json({
        message: "Reply of your message is created successfully.",
        success: true,
        chatTitle,
        aiMessage,
        userMessage
    });
   }

    const titleRetrive = await chatModel.findById(chatId);

    chatTitle = titleRetrive.title

    aiMessage = await messageModel.create({
      chat: chatId,
      content: aiReply,
      role: "ai"
    })    

    userMessage = await messageModel.create({
        chat: chatId,
        content: message,
        role: "user"
    })

    return res.status(201).json({
        message: "Reply of your message is created successfully.",
        success: true,
        chatTitle,
        aiMessage,
        userMessage
    });
   }
   catch(err){
      err.status = 500;
      next(err)
   }
};