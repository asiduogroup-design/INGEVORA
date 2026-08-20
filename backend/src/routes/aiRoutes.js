import { Router } from 'express'
import { getAIUpdate, listAIUpdates } from '../controllers/aiController.js'

export const aiRoutes = Router()

aiRoutes.get('/', listAIUpdates)
aiRoutes.get('/:id', getAIUpdate)
