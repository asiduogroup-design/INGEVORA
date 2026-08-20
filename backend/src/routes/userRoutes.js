import { Router } from 'express'
import { getMe, updateMe } from '../controllers/userController.js'

export const userRoutes = Router()

userRoutes.get('/me', getMe)
userRoutes.put('/me', updateMe)
