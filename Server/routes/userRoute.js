import express from 'express'
const userRoute = express.Router()

import authMiddleware from '../middlewares/auth.js'
import { registerUser,loginuser,getUserData } from '../controllers/userController.js'

userRoute.post('/register',registerUser)
userRoute.post('/login',loginuser)
userRoute.get('/getuser' ,authMiddleware ,getUserData)




export default userRoute;