import express, { Router } from 'express'
const sellerRoute = express.Router()
import  createSeller  from '../controllers/sellerController.js'
import authMiddleware from '../middlewares/auth.js'

sellerRoute.post('/create',authMiddleware,createSeller)

export default sellerRoute;