import { ok } from '../utils/response.js'

export async function listAIUpdates(req, res) {
  return ok(res, { data: [] }, 'AI updates loaded')
}

export async function getAIUpdate(req, res) {
  return ok(res, { data: { id: req.params.id } }, 'AI update loaded')
}
