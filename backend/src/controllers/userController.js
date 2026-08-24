import { ok } from '../utils/response.js'
import { pool } from '../config/database.js'

export async function getMe(req, res) {
  const [rows] = await pool.query(
    'SELECT id, name, email, phone, company, role, created_at, updated_at FROM users WHERE id = ? LIMIT 1',
    [req.user.id]
  )

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'User not found' })
  }

  return ok(res, { data: rows[0] }, 'User profile loaded')
}

export async function updateMe(req, res) {
  const { name, phone, company } = req.body

  await pool.query(
    `UPDATE users
     SET name = COALESCE(?, name),
         phone = COALESCE(?, phone),
         company = COALESCE(?, company)
     WHERE id = ?`,
    [name || null, phone || null, company || null, req.user.id]
  )

  const [rows] = await pool.query(
    'SELECT id, name, email, phone, company, role, created_at, updated_at FROM users WHERE id = ? LIMIT 1',
    [req.user.id]
  )

  return ok(res, { data: rows[0] }, 'User profile updated')
}
