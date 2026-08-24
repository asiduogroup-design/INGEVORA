import { ok } from '../utils/response.js'
import { pool } from '../config/database.js'
import { required } from '../utils/validation.js'

export async function createServiceRequest(req, res) {
  const { title, serviceType, description, budget = null, preferredContact = null } = req.body

  if (!required(title) || !required(serviceType) || !required(description)) {
    return res.status(400).json({ success: false, message: 'Title, service type and description are required' })
  }

  const [result] = await pool.query(
    `INSERT INTO service_requests
      (user_id, title, service_type, description, budget, preferred_contact_method, status, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, 'Submitted', 'PENDING')`,
    [req.user.id, String(title).trim(), String(serviceType).trim(), String(description).trim(), budget, preferredContact]
  )

  const [rows] = await pool.query(
    `SELECT id, user_id, title, service_type, description, budget, preferred_contact_method,
            status, quoted_amount, payment_status, created_at, updated_at
     FROM service_requests
     WHERE id = ? LIMIT 1`,
    [result.insertId]
  )

  return ok(res.status(201), { data: rows[0] }, 'Service request submitted')
}

export async function listServiceRequests(req, res) {
  const isAdmin = req.user.role === 'admin'
  const [rows] = isAdmin
    ? await pool.query(
      `SELECT sr.id, sr.user_id, u.name AS user_name, u.email AS user_email, sr.title, sr.service_type,
              sr.description, sr.budget, sr.preferred_contact_method, sr.status, sr.quoted_amount,
              sr.payment_status, sr.created_at, sr.updated_at
       FROM service_requests sr
       LEFT JOIN users u ON u.id = sr.user_id
       ORDER BY sr.created_at DESC`
    )
    : await pool.query(
      `SELECT id, user_id, title, service_type, description, budget, preferred_contact_method,
              status, quoted_amount, payment_status, created_at, updated_at
       FROM service_requests
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.id]
    )

  return ok(res, { data: rows }, 'Service requests loaded')
}

export async function getServiceRequest(req, res) {
  const requestId = Number(req.params.id)
  if (!Number.isFinite(requestId)) {
    return res.status(400).json({ success: false, message: 'Invalid service request id' })
  }

  const isAdmin = req.user.role === 'admin'
  const [rows] = isAdmin
    ? await pool.query(
      `SELECT sr.id, sr.user_id, u.name AS user_name, u.email AS user_email, sr.title, sr.service_type,
              sr.description, sr.budget, sr.preferred_contact_method, sr.status, sr.quoted_amount,
              sr.payment_status, sr.created_at, sr.updated_at
       FROM service_requests sr
       LEFT JOIN users u ON u.id = sr.user_id
       WHERE sr.id = ?
       LIMIT 1`,
      [requestId]
    )
    : await pool.query(
      `SELECT id, user_id, title, service_type, description, budget, preferred_contact_method,
              status, quoted_amount, payment_status, created_at, updated_at
       FROM service_requests
       WHERE id = ? AND user_id = ?
       LIMIT 1`,
      [requestId, req.user.id]
    )

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Service request not found' })
  }

  return ok(res, { data: rows[0] }, 'Service request loaded')
}

export async function adminQuoteServiceRequest(req, res) {
  const requestId = Number(req.params.id)
  const { quotedAmount, status } = req.body

  if (!Number.isFinite(requestId)) {
    return res.status(400).json({ success: false, message: 'Invalid service request id' })
  }

  const updateFields = []
  const updateValues = []

  if (quotedAmount !== undefined) {
    const normalizedQuote = Number(quotedAmount)
    if (!Number.isFinite(normalizedQuote) || normalizedQuote <= 0) {
      return res.status(400).json({ success: false, message: 'Quoted amount must be a positive number' })
    }
    updateFields.push('quoted_amount = ?')
    updateValues.push(normalizedQuote.toFixed(2))

    // Once quote exists, the request becomes payable until a Stripe webhook marks it paid.
    updateFields.push("payment_status = CASE WHEN payment_status = 'PAID' THEN payment_status ELSE 'PENDING' END")
  }

  if (status !== undefined) {
    const allowedStatuses = ['Submitted', 'Under Review', 'Contacted', 'In Progress', 'Completed', 'Cancelled']
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid service request status' })
    }
    updateFields.push('status = ?')
    updateValues.push(status)
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ success: false, message: 'No update fields provided' })
  }

  await pool.query(
    `UPDATE service_requests
     SET ${updateFields.join(', ')}
     WHERE id = ?`,
    [...updateValues, requestId]
  )

  const [rows] = await pool.query(
    `SELECT sr.id, sr.user_id, u.name AS user_name, u.email AS user_email, sr.title, sr.service_type,
            sr.description, sr.budget, sr.preferred_contact_method, sr.status, sr.quoted_amount,
            sr.payment_status, sr.created_at, sr.updated_at
     FROM service_requests sr
     LEFT JOIN users u ON u.id = sr.user_id
     WHERE sr.id = ?
     LIMIT 1`,
    [requestId]
  )

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Service request not found' })
  }

  return ok(res, { data: rows[0] }, 'Service request updated')
}
