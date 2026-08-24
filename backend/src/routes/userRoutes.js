import { Router } from 'express'
import { getMe, updateMe } from '../controllers/userController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

export const userRoutes = Router()

userRoutes.get('/me', requireAuth, getMe)
userRoutes.put('/me', requireAuth, updateMe)
