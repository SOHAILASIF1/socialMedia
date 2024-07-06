import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import Post from "../models/Post.js";
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const createUser = new User({
            name,
            email,
            password: hashedPassword,
            avatar: { public_id: "sample_id", url: "sampleurl" }
        });

        await createUser.save();

        // Generate a token
        const token = jwt.sign({ _id: createUser._id }, process.env.JWT_SECRET);

        // Set cookie options
        const options = {
            expires: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        // Send response
        res.status(201).cookie('token', token, options).json({
            success: true,
            user: {
                _id: createUser._id,
                name: createUser.name,
                email: createUser.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

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
export const logout=async(req,res)=>{
    try {
        res.status(200).cookie("tokwn",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"Logged Out"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message

        })
        
    }
}


export const updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { oldPassword, newPassword } = req.body;
        
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Old password does not match"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProfile=async(req,res)=>{
    const user=await User.findById(req.user._id)
    const{name,email}=req.body
    if (name) {
        user.name=name
        
    }
    if (email) {
        user.email=email
        
    }
    await user.save()
    res.status(200).json({
        success:true,
        message:"profile update"

    })
}
export const deleteMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const posts = user.posts;
        const followers=user.followers

        // Remove the user
        await User.deleteOne({ _id: req.user._id });

        // Clear the token cookie
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        // Remove all posts of the user
        for (let i = 0; i < posts.length; i++) {
            await Post.deleteOne({ _id: posts[i] });
        }

        for (let i = 0; i < followers.length; i++) {
            await Post.deleteOne({ _id: posts[i] });
            
        }

        res.status(200).json({
            success: true,
            message: "Profile Deleted"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const myProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id).populate("posts")
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
}

export const getUserProfile=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id).populate("posts")
        if (!user) {
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
            
        }
        res.status(200).json({
            success:true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const getAllUser=async(req,res)=>{
    try {
        const users=await User.find({})
        res.status(200).json({
            success:true,
            users

        })

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        
    }
}