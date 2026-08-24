import { pool } from '../config/database.js'
import { hashPassword } from '../utils/password.js'

const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD || ''
const name = process.env.ADMIN_NAME || 'INGEVORA Admin'

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment.')
  process.exitCode = 1
} else {
  try {
    const passwordHash = await hashPassword(password)
    await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES (?, ?, ?, 'admin')
       ON DUPLICATE KEY UPDATE name = ?, password_hash = ?, role = 'admin'`,
      [name, email, passwordHash, name, passwordHash],
    )
    console.log(`Admin user seeded: ${email}`)
  } catch (error) {
    console.error(`Unable to seed admin user: ${error.message}`)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}
