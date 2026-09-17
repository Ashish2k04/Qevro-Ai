import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const sendMessages = async ({message, chatId}) => {
    const response = await api.post('/api/message', {message, chatId});
    return response.data
};

export const getChats = async () => {
    const response = await api.get('/api/get-chats');
    return response.data
};

export const getMessages = async (chatId) => {
    const response = await api.get(`/api/get-messages/${chatId}`);
    return response.data
};

export const deletChat = async (chatId) => {
    const response = await api.delete(`/api/delete-chat/${chatId}`);
    return response.data
};

