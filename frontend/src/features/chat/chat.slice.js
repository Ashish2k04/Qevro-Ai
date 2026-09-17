import {createSlice} from '@reduxjs/toolkit';
import { setError, setLoading } from '../auth/auth.slice';
import { act } from 'react';

const chatSlice = createSlice({
      name: "chat",
      initialState: {
        chat: null,
        loading: null,
        error: null,
      },
      reducers: {
        setChat: (state, action) => {
            state.chat == action.payload
        },
        setLoading: (state, action) => {
            state.loading == action.payload
        },
        setError: (state, action) => {
            state.error == action.payload
        }
      }
})

export const {setChat, setLoading, setError} = chatSlice.actions;
export default chatSlice.reducer;

