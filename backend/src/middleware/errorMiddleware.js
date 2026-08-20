import { env } from '../config/environment.js'

export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`)
  error.status = 404
  next(error)
}

export function errorHandler(error, req, res, next) {
  const status = error.status || 500
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal server error' : error.message,
    ...(env.nodeEnv !== 'production' && { details: error.message }),
  })
}
