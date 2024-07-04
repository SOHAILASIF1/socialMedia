import express from  'express'
import { createPost } from '../controller/post.controller.js'
import { isAuthenticated } from '../middleware/auth.js'
const router=express.Router()
router.post('/post/upload',isAuthenticated,createPost)
export default router