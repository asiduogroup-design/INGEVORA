import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js'

export function signToken(payload) {
  return jwt.sign(payload, env.jwt.secret || 'development-secret', {
    expiresIn: env.jwt.expiresIn,
  })
}
