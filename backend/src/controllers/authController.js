import { ok } from '../utils/response.js'

export async function register(req, res) {
  return ok(res.status(201), {}, 'Registration endpoint ready')
}

export async function login(req, res) {
  return ok(res, {}, 'Login endpoint ready')
}

export async function logout(req, res) {
  return ok(res, {}, 'Logged out')
}

export async function me(req, res) {
  return ok(res, { data: null }, 'Current user loaded')
}
