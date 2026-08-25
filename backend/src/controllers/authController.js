import { ok } from '../utils/response.js'
import { pool } from '../config/database.js'
import { hashPassword, comparePassword } from '../utils/password.js'
import { signToken } from '../utils/jwt.js'
import { required } from '../utils/validation.js'

export async function register(req, res) {
  const { name, email, password, phone = null, company = null } = req.body

  if (!required(name) || !required(email) || !required(password)) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required' })
  }

  const normalizedEmail = String(email).trim().toLowerCase()
  const [existingRows] = await pool.query('SELECT id FROM users WHERE email = ? LIMIT 1', [normalizedEmail])
  if (existingRows.length > 0) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists' })
  }

  const passwordHash = await hashPassword(password)
  const [result] = await pool.query(
    `INSERT INTO users (name, email, phone, company, password_hash, role)
     VALUES (?, ?, ?, ?, ?, 'user')`,
    [String(name).trim(), normalizedEmail, phone, company, passwordHash]
  )

  const user = {
    id: Number(result.insertId),
    name: String(name).trim(),
    email: normalizedEmail,
    phone,
    company,
    role: 'user',
  }
  const token = signToken({ id: user.id, email: user.email, role: user.role })

  return ok(res.status(201), { data: { user, token } }, 'Registration successful')
}

export async function login(req, res) {
  const { email, password } = req.body
  if (!required(email) || !required(password)) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  const normalizedEmail = String(email).trim().toLowerCase()
  const [rows] = await pool.query(
    'SELECT id, name, email, phone, company, role, password_hash FROM users WHERE email = ? LIMIT 1',
    [normalizedEmail]
  )

  if (rows.length === 0) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }

  const userRow = rows[0]
  let matches = false
  try {
    matches = await comparePassword(password, userRow.password_hash)
  } catch (error) {
    console.error(`Password comparison failed for ${normalizedEmail}:`, error.message)
    matches = false
  }
  if (!matches) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
  }

  const user = {
    id: Number(userRow.id),
    name: userRow.name,
    email: userRow.email,
    phone: userRow.phone,
    company: userRow.company,
    role: userRow.role,
  }
  const token = signToken({ id: user.id, email: user.email, role: user.role })

  return ok(res, { data: { user, token } }, 'Login successful')
}

export async function logout(req, res) {
  return ok(res, {}, 'Logged out')
}

export async function me(req, res) {
  if (!req.user?.id) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  const [rows] = await pool.query(
    'SELECT id, name, email, phone, company, role FROM users WHERE id = ? LIMIT 1',
    [req.user.id]
  )

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'User not found' })
  }

  return ok(res, { data: rows[0] }, 'Current user loaded')
}
