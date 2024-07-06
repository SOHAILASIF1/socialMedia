import express from  'express'
import { registerUser,login, logout, updatePassword, updateProfile, deleteMyProfile, myProfile, getUserProfile, getAllUser } from '../controller/user.controller.js'
import { isAuthenticated } from '../middleware/auth.js'
import { followUser } from '../controller/post.controller.js'

const router=express.Router()
router.post('/user/signup',registerUser)
router.post('/user/login',login)
router.get('/user/follow/:id',isAuthenticated,followUser)
router.get('/user/logout',logout)
router.put('/user/updatePassword',isAuthenticated,updatePassword)
router.put('/user/updateProfile',isAuthenticated,updateProfile)
router.delete('/delete/me',isAuthenticated,deleteMyProfile)
router.get('/me',isAuthenticated,myProfile)
router.get('/user/:id',isAuthenticated,getUserProfile)
router.get('/users',isAuthenticated,getAllUser)



export default router