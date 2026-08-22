import 'dotenv/config';
import mongoose from 'mongoose';

async function connectDB() {
        mongoose.connect(process.env.MONGODB_URI)
        .then(()=>{
            console.log('MongoDB is connected!')
        })
        .catch((err)=>{
            console.log(`Something went wrong in db: ${err.message}`)
        })
        
};

export default connectDB;