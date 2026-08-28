import { Router } from 'express'
import {
  createCheckoutSession,
  createCodPayment,
  getPayment,
  listUserPayments,
} from '../controllers/paymentController.js'
import { requireAuth } from '../middleware/authMiddleware.js'

export const paymentRoutes = Router()

paymentRoutes.post('/checkout-session', requireAuth, createCheckoutSession)
paymentRoutes.post('/cod', requireAuth, createCodPayment)
paymentRoutes.get('/', requireAuth, listUserPayments)
paymentRoutes.get('/:id', requireAuth, getPayment)
