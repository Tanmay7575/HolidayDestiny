import express ,{Request,Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check,validationResult} from "express-validator";
import verifyToken from "../middleware/auth";
const router=express.Router();

router.get("/me",verifyToken,async(req:Request,res:Response)=>{
    const userId = req.userId;
    try {
    const user=await User.findById(userId).select("-password");

    if(!user){
        return res.status(400).json({message:"User not found"});
    }
     res.json(user);

    } catch (error) {
         console.log(error);
         res.status(500).json({message:"Something went wrong"});
    }

})




//backend checks
router.post("/register",[
    check("firstName","First Name is required").isString(),
    check("lastName","last Name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","password is required").isLength({min:6})

],async(req:Request,res:Response)=>{
    const errors=validationResult(req);
   
    if(!errors.isEmpty()){
        return res.status(400).json({message:errors.array()});
    }
     try {
         let user=await User.findOne({
            email:req.body.email,
         });

         if(user){
            return res.status(400).json({message:"user already exists"})
         }
         user=new User(req.body);
         await user.save();
         const token =jwt.sign({userId:user._id},
            process.env.SCREATKEY as string,{
                expiresIn: "1d"
            }
        );

        res.cookie("auth_token",token,{
            httpOnly: true,
            secure: true,
            samesite: "none",
            maxAge:86400000,
        });
        return res.status(200).send({message:"User Register Successfully"});
     } catch (error) {
         res.status(500).send({message:"Something went wrong"});
     }
});



export default router;
