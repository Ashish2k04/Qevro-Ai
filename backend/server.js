import app from './src/app.js';
import 'dotenv/config';
import connectDB from './src/config/database.js';
import { testApi } from './src/services/ai.service.js';

const PORT = process.env.PORT || 8000

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

