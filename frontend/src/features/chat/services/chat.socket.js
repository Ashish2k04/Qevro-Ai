import {io} from 'socket.io-client';

export const initializeSocketConnection = () =>{
    const socket = io("https://qevro-ai.onrender.com", {
        withCredentials: true
    })

    socket.on('connect', ()=>{
        console.log('Connected to socketIo server.')
    })
}