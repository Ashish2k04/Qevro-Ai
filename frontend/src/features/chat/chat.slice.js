import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({

    name: "chat",

    initialState: {
        chats: {},
        currentChatId: null,
        loading: false,
        error: null,
    },

    reducers: {

        createNewChat: (state, action) => {

            const { chatId, title } = action.payload;

            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString()
            };
        },


        addNewMessage: (state, action) => {

            const { chatId, content, role } = action.payload;

            // Safety check
            if (!state.chats[chatId]) {
                return;
            }

            state.chats[chatId].messages.push({
                content,
                role
            });

            state.chats[chatId].lastUpdated =
                new Date().toISOString();
        },


        setChats: (state, action) => {

            state.chats = action.payload;
        },


        setcurrentChatId: (state, action) => {

            state.currentChatId = action.payload;
        },


        setLoading: (state, action) => {

            state.loading = action.payload;
        },


        setError: (state, action) => {

            state.error = action.payload;
        },


        deleteChatFromStore: (state, action) => {

            const chatId = action.payload;

            delete state.chats[chatId];

            if (state.currentChatId === chatId) {
                state.currentChatId = null;
            }
        },


        clearError: (state) => {

            state.error = null;
        }

    }
});


export const {
    setChats,
    setcurrentChatId,
    createNewChat,
    addNewMessage,
    setLoading,
    setError,
    deleteChatFromStore,
    clearError
} = chatSlice.actions;


export default chatSlice.reducer;