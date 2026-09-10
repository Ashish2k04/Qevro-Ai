import {Server} from 'socket.io';

let io;

export const intializeSocket = (httpServer) =>{
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    });

    console.log("Socketio Server is running.")

    io.on('connect', (socket)=>{
          console.log("A user is connected", socket.id);
    })
}

export const getIo = () =>{
    if(!io){
        throw new Error('Socketio not intialized')
    }

    return io;
}