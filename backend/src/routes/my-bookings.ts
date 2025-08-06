import express,{ Request,Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";

const router= express.Router();

router.get("/",verifyToken,async(req:Request,res:Response)=>{
    try {
        const hotels=await Hotel.find({
            bookings:{
                $eleMatch:{userId:req.userId}
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Unable to fetch bookings"});
    }

})