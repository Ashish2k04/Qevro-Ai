import { initializeSocketConnection } from '../services/chat.socket.js';
import { useDispatch } from 'react-redux';
import { sendMessages } from '../services/chat.api.js';

import {
    createNewChat,
    addNewMessage,
    setLoading,
    setError,
    clearError
} from '../chat.slice.js';

export const useChat = () => {
    const dispatch = useDispatch();

    async function handleSendMessages({ message, chatId }) {
        dispatch(setLoading(true));
        dispatch(clearError());

        try {
            const data = await sendMessages({ message, chatId });

            if (!chatId && data?.chat) {
                dispatch(createNewChat({
                    chatId: data.chat._id,
                    title: data.chat.title
                }));

                dispatch(addNewMessage({
                    chatId: data.chat._id,
                    content: message,
                    role: "user"
                }));

                if (data?.aiMessage) {
                    dispatch(addNewMessage({
                        chatId: data.chat._id,
                        content: data.aiMessage.content,
                        role: data.aiMessage.role
                    }));
                }
            }

            else if (chatId) {
                dispatch(addNewMessage({
                    chatId,
                    content: message,
                    role: "user"
                }));

                if (data?.aiMessage) {
                    dispatch(addNewMessage({
                        chatId,
                        content: data.aiMessage.content,
                        role: data.aiMessage.role
                    }));
                }
            }

            return data;
        }
        catch (error) {
            dispatch(
                setError(
                    error.response?.data?.message ||
                    "Something went wrong while sending message"
                )
            );

            throw error;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return {
        initializeSocketConnection,
        handleSendMessages
    };
};