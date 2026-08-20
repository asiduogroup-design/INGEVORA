import { ok } from '../utils/response.js'

export async function listPricing(req, res) {
  return ok(res, { data: [] }, 'Pricing loaded')
}
