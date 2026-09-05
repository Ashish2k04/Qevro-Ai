import app from './src/app.js';
import 'dotenv/config';
import connectDB from './src/config/database.js';

const PORT = process.env.PORT || 8000

connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
})
.catch((err)=>{
    console.log(`MongoDB is failed to connected`, err.message)
    process.exit(1);
});



