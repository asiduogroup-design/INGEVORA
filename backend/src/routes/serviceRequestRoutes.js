import { Router } from 'express'
import {
  adminQuoteServiceRequest,
  createServiceRequest,
  getServiceRequest,
  listServiceRequests,
} from '../controllers/serviceRequestController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireAdmin } from '../middleware/adminMiddleware.js'

export const serviceRequestRoutes = Router()

serviceRequestRoutes.post('/', requireAuth, createServiceRequest)
serviceRequestRoutes.get('/', requireAuth, listServiceRequests)
serviceRequestRoutes.get('/:id', requireAuth, getServiceRequest)
serviceRequestRoutes.patch('/:id/quote', requireAuth, requireAdmin, adminQuoteServiceRequest)
