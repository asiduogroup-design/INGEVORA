import { Router } from 'express'
import {
  createCheckoutSession,
  getPayment,
  listUserPayments,
} from '../controllers/paymentController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

export const paymentRoutes = Router()

paymentRoutes.post('/checkout-session', requireAuth, createCheckoutSession)
paymentRoutes.get('/', requireAuth, listUserPayments)
paymentRoutes.get('/:id', requireAuth, getPayment)
