import 'dotenv/config';
import {createServer} from 'http';
import app from './src/app.js';
import connectDB from './src/config/database.js';
import { intializeSocket } from './src/sockets/server.socket.js';

const PORT = process.env.PORT || 8000

const httpServer = createServer(app);

intializeSocket(httpServer);

connectDB()
.then(()=>{
    httpServer.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
})
.catch((err)=>{
    console.log(`MongoDB is failed to connected`, err.message)
    process.exit(1);
});



