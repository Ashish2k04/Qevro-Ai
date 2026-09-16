import { askAi, generateChatTitle } from '../services/ai.service.js';
import chatModel from '../models/chat.model.js';
import messageModel from '../models/message.model.js';

export async function sendMessages(req,res,next) {
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

export async function getChats(req,res,next) {
     try{

        const {id} = req.user;

        const chats = await chatModel.find({user: id});

        if(chats.length === 0){
            return res.status(404).json({
                message: "You've have no chats yet.",
                success: false
            })
        }

        return res.status(200).json({
            message: "All chats fetched.",
            chats
        })

     }catch(err){
        err.status = 500;
        next(err)
     }
}

export async function getMessages(req,res,next) {
     try{
        
        const {chatId} = req.params;

        const chat = await chatModel.findOne({
            _id: chatId,
            user: req.user.id
        });

        if(!chat){
            return res.status(404).json({
                message: "404 chat not found.",
                success: false
            })
        }

        const messages = await messageModel.find({chat: chatId});

        return res.status(200).json({
            message: "All chats fetched.",
            messages
        })

     }catch(err){
        err.status = 500;
        next(err)
     }
}

export async function deleteChat(req,res,next){
    try{
        const {chatId} = req.params;

        const chat = await chatModel.findOneAndDelete({
            _id: chatId,
            user: req.user.id
        });

        if(!chat){
            return res.status(404).json({
                message: "Chat not found.",
                success: false
            })
        }
        
        await messageModel.deleteMany({chat: chatId});

        return res.status(200).json({
            message: "Chat Deleted Successfully.",
            success: true
        })
    }
    catch(err){
        err.status = 500;
        next(err)
    }
}