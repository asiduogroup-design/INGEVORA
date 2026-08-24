import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js'

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  const token = header.slice('Bearer '.length).trim()
  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  try {
    if (!env.jwt.secret) {
      return res.status(500).json({ success: false, message: 'Authentication is not configured' })
    }
    const decoded = jwt.verify(token, env.jwt.secret)
    req.user = {
      id: Number(decoded.id),
      email: decoded.email,
      role: decoded.role || 'user',
    }
    return next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}
