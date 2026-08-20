import { ok } from '../utils/response.js'

export async function createServiceRequest(req, res) {
  return ok(res.status(201), { data: req.body }, 'Service request submitted')
}

export async function listServiceRequests(req, res) {
  return ok(res, { data: [] }, 'Service requests loaded')
}

export async function getServiceRequest(req, res) {
  return ok(res, { data: { id: req.params.id } }, 'Service request loaded')
}
