import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
      name: "chat",
      initialState: {
        chats: {},
        currentChatId: null,
        loading: null,
        error: null,
      },
      reducers: {
        createNewChat: (state, action) => {
           const {chatId, title} = action.payload
           state.chats[chatId] = {
            id: chatId,
            title,
            messages: [],
            lastUpdated: new Date().toISOString()
           }
        },
        addNewMessage: (state, action) => {
            const {chatId, content, role} = action.payload
            state.chats[chatId].messages.push({content, role})
        },
        setChats: (state, action) => {
            state.chats == action.payload
        },
        setcurrentChatId: (state, action) => {
            state.currentChatId == action.payload
        },
        setLoading: (state, action) => {
            state.loading == action.payload
        },
        setError: (state, action) => {
            state.error == action.payload
        }
      }
})

export const {setChats, setcurrentChatId, createNewChat, addNewMessage, setLoading, setError} = chatSlice.actions;
export default chatSlice.reducer;
