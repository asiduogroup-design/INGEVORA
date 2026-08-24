import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js'

function getJwtSecret() {
  if (!env.jwt.secret) {
    throw new Error('JWT_SECRET must be configured')
  }
  return env.jwt.secret
}

export function signToken(payload) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: env.jwt.expiresIn,
  })
}
