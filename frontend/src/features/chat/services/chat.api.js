import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const sendMessage = async ({message, chatId}) => {
    const response = await api.post('/api/message', {message, chatId});
    return response.data
};

export const getChats = async () => {
    const response = await api.post('/api/get-chats');
    return response.data
};

