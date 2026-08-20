import { ok } from '../utils/response.js'

export async function getMe(req, res) {
  return ok(res, { data: null }, 'User profile loaded')
}

export async function updateMe(req, res) {
  return ok(res, { data: req.body }, 'User profile updated')
}
