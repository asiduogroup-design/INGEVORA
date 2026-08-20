import { Router } from 'express'
import { listTestimonials } from '../controllers/testimonialController.js'

export const testimonialRoutes = Router()

testimonialRoutes.get('/', listTestimonials)
