import express from 'express'
import dotenv from 'dotenv'
import postRouter from './routes/Post.route.js'
import userRouter from './routes/user.route.js'
import DBConnection from './config/db.js'
import cookieParser from 'cookie-parser';
const app=express()



dotenv.config({path:'config/config.env'})
DBConnection()
// app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.listen(process.env.PORT,()=>{
    console.log(`app is running at ${process.env.PORT}`);
})

//routes
app.use('/api',postRouter)
app.use('/api',userRouter)
