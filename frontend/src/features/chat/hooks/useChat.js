import {initializeSocketConnection} from '../services/chat.socket.js';
import {useDispatch} from 'react-redux';
import {sendMessages, getMessages, getChats, deletChat} from '../services/chat.api.js';
import {setChats, setcurrentChatId, createNewChat, addNewMessage, setLoading, setError} from '../chat.slice.js';

export const useChat = () => {

    const dispatch = useDispatch();

    async function handleSendMessages({message, chatId}){
        dispatch(setLoading(true));
        try{
           const data = await sendMessages({message, chatId})
           const {chat, aiMessage} = data;
           dispatch(createNewChat({
            chatId: chat._id,
            title: chat.title
           }))
           dispatch(addNewMessage({
            chatId: chat.id,
            content: message,
            role: "user"
           }))
           dispatch(addNewMessage({
            chatId: chat.id,
            content: aiMessage.content,
            role: aiMessage.role
           }))
           return data
        }
        catch(error){
            dispatch(setError(error.response?.data?.message || "Something went wrong while sending message"))
        }
        finally{
            dispatch(setLoading(false));
        }
    }


    return{initializeSocketConnection, handleSendMessages}
}   