import express from  'express'
import { addComment, createPost, deletePost, getPostOFollowing, likeUnlikePost, updateCaption } from '../controller/post.controller.js'
import { isAuthenticated } from '../middleware/auth.js'
const router=express.Router()
router.post('/post/upload',isAuthenticated,createPost)
router.get('/post/:id',isAuthenticated,likeUnlikePost)
router.delete('/post/:id',isAuthenticated,deletePost)
router.get('/posts',isAuthenticated,getPostOFollowing)
router.put('/post/:id',isAuthenticated,updateCaption)
router.post('/post/comment/:id',isAuthenticated,addComment)
export default router