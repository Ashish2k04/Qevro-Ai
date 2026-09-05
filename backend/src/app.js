import express from 'express';
import authRouter from './routes/auth.route.js';
import handleErrors from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res)=>{
    return res.json({
        message: 'Server is running...',
    })
})

app.use('/api', authRouter);

/*
@des: This route belongs to the unknown requests
*/
app.get('*name', (req,res)=>{
    return res.json({
        message: `/${req.params.name[1]} Page not found`,
    })
})

app.use(handleErrors);
export default app;
