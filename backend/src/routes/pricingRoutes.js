import { Router } from 'express'
import { listPricing } from '../controllers/pricingController.js'

export const pricingRoutes = Router()

pricingRoutes.get('/', listPricing)
