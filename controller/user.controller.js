import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const user=await User.findOne({email})
        if (user) {
            res.status(400).json({
                message:'user already exist'

            })
        
            
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const createUser=new User({
            name,
            email,
            password:hashedPassword,
            avatar:{public_id:"sample_id",url:"sampleurl"}
        })        
        await createUser.save()
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const options={expires:new Date(Date.now()+100*24*60*60*1000),httpOnly:true}
        res.status(201).cookie('token',token,options).json({
            success:true,
            user:{
                _id:user._id,
                namename:user.name,
                email:user.email
            },
            token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if (!user) {
            res.status(400).json({
                success:false,
                message:"User Not exist"
            })
            
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if (!isMatch) {
            res.status(400).json({
                success:false,
                message:"Invalid Password"
            })
            
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const options={expires:new Date(Date.now()+100*24*60*60*1000),httpOnly:true}
        res.status(201).cookie('token',token,options).json({
            success:true,
            user:{
                _id:user._id,
                namename:user.name,
                email:user.email
            },
            token
        })
        
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       })
        
    }
}