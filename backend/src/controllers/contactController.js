import { ok } from '../utils/response.js'

export async function createContactMessage(req, res) {
  return ok(res.status(201), { data: req.body }, 'Contact message submitted')
}
