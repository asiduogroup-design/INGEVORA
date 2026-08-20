import { Router } from 'express'
import {
  createServiceRequest,
  getServiceRequest,
  listServiceRequests,
} from '../controllers/serviceRequestController.js'

export const serviceRequestRoutes = Router()

serviceRequestRoutes.post('/', createServiceRequest)
serviceRequestRoutes.get('/', listServiceRequests)
serviceRequestRoutes.get('/:id', getServiceRequest)
