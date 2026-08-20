import { ok } from '../utils/response.js'

export async function listTestimonials(req, res) {
  return ok(res, { data: [] }, 'Testimonials loaded')
}
