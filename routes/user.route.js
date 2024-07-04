import express from  'express'
import { registerUser,login } from '../controller/user.controller.js'

const router=express.Router()
router.post('/user/signup',registerUser)
router.post('/user/login',login)

export default router