import express,{Request,Response} from 'express';
import cors from 'cors';

import 'dotenv/config';
import registerUser from './routes/users'
import loginRoute from './routes/auth'
import cookieParser from 'cookie-parser';
import path from 'path';

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app=express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.static(path.join(__dirname,"../../frontend/dist")))

app.use("/api/auth",loginRoute);
app.use("/api/users",registerUser);

app.listen(7000,()=>{
    console.log("server is runnig on :7000");
})