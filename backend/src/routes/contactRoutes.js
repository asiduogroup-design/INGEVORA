import { Router } from 'express'
import { createContactMessage } from '../controllers/contactController.js'

export const contactRoutes = Router()

contactRoutes.post('/', createContactMessage)
