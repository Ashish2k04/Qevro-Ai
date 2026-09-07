import express from 'express';
import authRouter from './routes/auth.route.js';
import handleErrors from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.get('/', (req,res)=>{
    return res.json({
        message: 'Server is running...',
    })
})

/*
@des: Route for all the incoming requests on authRouter
*/
app.use('/api', authRouter);

/*
@des: This route belongs to the unknown requests
*/
app.get('*name', (req,res)=>{
    return res.json({
        message: `/${req.params.name[1]} Page not found`,
    })
})

/*
@des: To catch all the errors inside the handleErrors middleware file
*/
app.use(handleErrors);
export default app;
