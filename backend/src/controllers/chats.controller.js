import { askAi, generateChatTitle } from '../services/ai.service.js';
import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';

export async function sendMessagesController(req,res,next) {
    try{
        const {message, chatId} = req.body;
        const {id} = req.user;

        let aiReply = null 

        let chatTitle = null;
        let aiTitle = null;
        let aiMessage = null;
        let userMessage = null;

    if(!chatId){ 
          aiReply = await askAi([
            {
                role: "user",
                content: message
            }
          ]);
          aiTitle = await generateChatTitle(message);
          chatTitle = await chatModel.create({
              user: id, 
              title: aiTitle
          });  

          aiMessage = await messageModel.create({
           chat: chatTitle._id,
           content: aiReply,
           role: "ai"
       })

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

    userMessage = await messageModel.create({
        chat: chatId,
        content: message,
        role: "user"
    })

    const messages = await messageModel.find({chat: chatId});

    aiReply = await askAi(messages);

     aiMessage = await messageModel.create({
       chat: chatId,
       content: aiReply,
       role: "ai"
    }) 

    console.log(messages)

    return res.status(201).json({
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