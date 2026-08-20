import { ok } from '../utils/response.js'

export async function listServices(req, res) {
  return ok(res, { data: [] }, 'Services loaded')
}

export async function getService(req, res) {
  return ok(res, { data: { id: req.params.id } }, 'Service loaded')
}
