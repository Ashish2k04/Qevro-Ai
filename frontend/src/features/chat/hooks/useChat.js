import {initializeSocketConnection} from '../services/chat.socket.js';
import {useDispatch} from 'react-redux';
import {sendMessages, getMessages, getChats, deletChat} from '../services/chat.api.js';
import {setChats, setcurrentChatId, setLoading, setError} from '../chat.slice.js';

export const useChat = () => {

    const dispatch = useDispatch();

    async function handleSendMessages({message, chatId}){
        dispatch(setLoading(true));
        try{
           const data = await sendMessages({message, chatId})
           const {chat, aiMessage} = data;
           dispatch(setChats((prev) => {
            return{ 
            ...prev,
             [chat._id]: {
              ...chat,
              messages: [{content: message, role: "user"}, aiMessage]
             }
            }
           }))
           dispatch(setcurrentChatId(chat._id));
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