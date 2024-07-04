import Post from "../models/Post.js";
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