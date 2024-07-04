import Post from "../models/Post.js";
import User from "../models/User.js";
export const createPost=async(req,res)=>{
    try {
        const newPostData={
            caption:req.body.caption,
            image:{
                public_id:req.body.public_id,
                url:req.body.url
            },
            owner:req.user._id
        }
        const newPost=await Post.create(newPostData)
        const user=await User.findById(req.user._id)
        user.posts.push(newPost._id)
        await user.save()


        res.status(200).json({
            sucsess:true,
            post:newPost,
            message:"Post uploaded "
        })

        
    } catch (error) {
        res.status(500).json({
            sucsess:false,
            message:error.message
        })
        
    }
}