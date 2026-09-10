import {io} from 'socket.io-client';

export const initializeSocketConnection = () =>{
    const socket = io("http://localhost:3000/api", {
        withCredentials: true
    })

    socket.on('connect', ()=>{
        console.log('SocketIO is connected.')
    })
}