import {initializeSocketConnection} from '../services/chat.socket.js';
import {useDispatch} from 'react-redux';
import {sendMessages, getMessages, getChats, deletChat} from '../services/chat.api.js';
import {setChats, setcurrentChatId, setLoading, setError} from '../chat.slice.js';

export const useChat = () => {

    const dispatch = useDispatch();


    return{initializeSocketConnection}
}