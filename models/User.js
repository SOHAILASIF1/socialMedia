import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"]
    },
    avatar:{
        public_id:String,
        url:String


    },
    email:{
        type:String,
        required:[true,"Please enter a email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"]
    },
    
   
    posts:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Post"
            }
        }
    ],
    followers:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            
        }

    ],
    following:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            
        }

    ]
})
const User = mongoose.model('User', userSchema);

export default User;