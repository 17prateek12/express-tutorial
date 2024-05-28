import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registeruser = asyncHandler(async(req,res)=>{
    const {email,username,password}=req.body;
    if(!email || !username || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Exist");
    }
    const hashedPassword =await bcrypt.hash(password,10);
    console.log("Hashed Password: ",hashedPassword);    
    const user= await User.create({
        username,
        email,
        password:hashedPassword,
    })
    console.log(`User Created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        throw new Error("user data is not valid")
    }
})

const loginuser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
        {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        const user= await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            const accessToken =     jwt.sign({
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"18m"}
        );
            res.status(200).json({accessToken});
        }else{
            res.status(401)
            throw new Error("Email or password is invalid");
        }
});

const currentuser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

export {registeruser,loginuser,currentuser}