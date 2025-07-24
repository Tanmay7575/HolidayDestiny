import express,{Request,Response} from 'express';
import cors from 'cors';

import 'dotenv/config';
import registerUser from './routes/users'
import loginRoute from './routes/auth'
import HotelRoute from './routes/my-hotels'
import cookieParser from 'cookie-parser';
import path from 'path';
import{v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

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

const frontendPath = path.join(__dirname, "./frontend/dist");

app.use(express.static(frontendPath));

app.use("/api/auth",loginRoute);
app.use("/api/users",registerUser);
app.use("/api/my-hotels",HotelRoute);



app.listen(7000,()=>{
    console.log("server is runnig on :7000");
})