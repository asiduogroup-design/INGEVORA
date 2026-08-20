import { Router } from 'express'
import { getService, listServices } from '../controllers/serviceController.js'

export const serviceRoutes = Router()

serviceRoutes.get('/', listServices)
serviceRoutes.get('/:id', getService)
