import Stripe from 'stripe'
import { pool } from '../config/database.js'
import { env } from '../config/environment.js'
import { ok } from '../utils/response.js'

const stripe = env.stripe.secretKey
  ? new Stripe(env.stripe.secretKey)
  : null

function requireStripeConfigured() {
  if (!stripe) {
    const error = new Error('Stripe is not configured')
    error.status = 500
    throw error
  }
}

export async function createCheckoutSession(req, res) {
  requireStripeConfigured()

  const serviceRequestId = Number(req.body.serviceRequestId)
  if (!Number.isFinite(serviceRequestId)) {
    return res.status(400).json({ success: false, message: 'Invalid service request id' })
  }

  const [requestRows] = await pool.query(
    `SELECT id, user_id, title, service_type, quoted_amount, payment_status
     FROM service_requests
     WHERE id = ? AND user_id = ?
     LIMIT 1`,
    [serviceRequestId, req.user.id]
  )

  if (requestRows.length === 0) {
    return res.status(404).json({ success: false, message: 'Service request not found' })
  }

  const request = requestRows[0]
  const quoteAmount = Number(request.quoted_amount)
  if (!Number.isFinite(quoteAmount) || quoteAmount <= 0) {
    return res.status(400).json({ success: false, message: 'This request is not quoted yet' })
  }

  if (request.payment_status === 'PAID') {
    return res.status(400).json({ success: false, message: 'This request is already paid' })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'eur',
          product_data: {
            name: request.title || `Service Request #${request.id}`,
            description: request.service_type ? `Service type: ${request.service_type}` : undefined,
          },
          unit_amount: Math.round(quoteAmount * 100),
        },
      },
    ],
    success_url: `${env.frontendUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.frontendUrl}/payments/cancel?service_request_id=${request.id}`,
    metadata: {
      userId: String(req.user.id),
      serviceRequestId: String(request.id),
    },
  })

  const [insertResult] = await pool.query(
    `INSERT INTO payments
      (user_id, service_request_id, payment_method, stripe_session_id, stripe_payment_intent_id, amount, currency, status)
     VALUES (?, ?, 'CARD', ?, ?, ?, 'EUR', 'PENDING')`,
    [
      req.user.id,
      request.id,
      session.id,
      typeof session.payment_intent === 'string' ? session.payment_intent : null,
      quoteAmount.toFixed(2),
    ]
  )

  await pool.query(
    "UPDATE service_requests SET payment_status = 'PENDING' WHERE id = ? AND payment_status <> 'PAID'",
    [request.id]
  )

  return ok(res, {
    data: {
      paymentId: insertResult.insertId,
      sessionId: session.id,
      checkoutUrl: session.url,
    },
  }, 'Checkout session created')
}

export async function createCodPayment(req, res) {
  const serviceRequestId = Number(req.body.serviceRequestId)
  if (!Number.isFinite(serviceRequestId)) {
    return res.status(400).json({ success: false, message: 'Invalid service request id' })
  }

  const [requestRows] = await pool.query(
    `SELECT id, user_id, title, service_type, quoted_amount, payment_status
     FROM service_requests
     WHERE id = ? AND user_id = ?
     LIMIT 1`,
    [serviceRequestId, req.user.id]
  )

  if (requestRows.length === 0) {
    return res.status(404).json({ success: false, message: 'Service request not found' })
  }

  const request = requestRows[0]
  const quoteAmount = Number(request.quoted_amount)
  if (!Number.isFinite(quoteAmount) || quoteAmount <= 0) {
    return res.status(400).json({ success: false, message: 'This request is not quoted yet' })
  }

  if (request.payment_status === 'PAID') {
    return res.status(400).json({ success: false, message: 'This request is already paid' })
  }

  const [insertResult] = await pool.query(
    `INSERT INTO payments
      (user_id, service_request_id, payment_method, stripe_session_id, stripe_payment_intent_id, amount, currency, status)
     VALUES (?, ?, 'COD', NULL, NULL, ?, 'EUR', 'COD_PENDING')`,
    [req.user.id, request.id, quoteAmount.toFixed(2)]
  )

  await pool.query(
    "UPDATE service_requests SET payment_status = 'COD_PENDING' WHERE id = ?",
    [request.id]
  )

  return ok(res, {
    data: { paymentId: insertResult.insertId },
  }, 'Cash on delivery selected')
}

export async function getPayment(req, res) {
  const paymentId = Number(req.params.id)
  if (!Number.isFinite(paymentId)) {
    return res.status(400).json({ success: false, message: 'Invalid payment id' })
  }

  const isAdmin = req.user.role === 'admin'
  const [rows] = isAdmin
    ? await pool.query(
      `SELECT p.id, p.user_id, p.service_request_id, p.stripe_session_id, p.stripe_payment_intent_id,
              p.amount, p.currency, p.status, p.created_at, p.updated_at
       FROM payments p
       WHERE p.id = ?
       LIMIT 1`,
      [paymentId]
    )
    : await pool.query(
      `SELECT p.id, p.user_id, p.service_request_id, p.stripe_session_id, p.stripe_payment_intent_id,
              p.amount, p.currency, p.status, p.created_at, p.updated_at
       FROM payments p
       WHERE p.id = ? AND p.user_id = ?
       LIMIT 1`,
      [paymentId, req.user.id]
    )

  if (rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Payment not found' })
  }

  return ok(res, { data: rows[0] }, 'Payment loaded')
}

export async function listUserPayments(req, res) {
  const isAdmin = req.user.role === 'admin'
  const [rows] = isAdmin
    ? await pool.query(
      `SELECT p.id, p.user_id, u.email AS user_email, p.service_request_id, sr.title AS service_request_title,
              p.stripe_session_id, p.stripe_payment_intent_id, p.amount, p.currency, p.status,
              p.created_at, p.updated_at
       FROM payments p
       LEFT JOIN users u ON u.id = p.user_id
       LEFT JOIN service_requests sr ON sr.id = p.service_request_id
       ORDER BY p.created_at DESC`
    )
    : await pool.query(
      `SELECT p.id, p.user_id, p.service_request_id, sr.title AS service_request_title,
              p.stripe_session_id, p.stripe_payment_intent_id, p.amount, p.currency, p.status,
              p.created_at, p.updated_at
       FROM payments p
       LEFT JOIN service_requests sr ON sr.id = p.service_request_id
       WHERE p.user_id = ?
       ORDER BY p.created_at DESC`,
      [req.user.id]
    )

  return ok(res, { data: rows }, 'Payments loaded')
}

async function upsertPaymentFromCheckoutSession(session, nextStatus) {
  const metadataUserId = Number(session.metadata?.userId)
  const metadataServiceRequestId = Number(session.metadata?.serviceRequestId)
  const amountInEur = Number(session.amount_total || 0) / 100

  if (!Number.isFinite(metadataUserId) || !Number.isFinite(metadataServiceRequestId)) {
    return
  }

  await pool.query(
    `INSERT INTO payments
      (user_id, service_request_id, stripe_session_id, stripe_payment_intent_id, amount, currency, status)
     VALUES (?, ?, ?, ?, ?, 'EUR', ?)
     ON DUPLICATE KEY UPDATE
       stripe_payment_intent_id = VALUES(stripe_payment_intent_id),
       amount = VALUES(amount),
       currency = VALUES(currency),
       status = VALUES(status),
       updated_at = CURRENT_TIMESTAMP`,
    [
      metadataUserId,
      metadataServiceRequestId,
      session.id,
      typeof session.payment_intent === 'string' ? session.payment_intent : null,
      amountInEur.toFixed(2),
      nextStatus,
    ]
  )

  await pool.query(
    'UPDATE service_requests SET payment_status = ? WHERE id = ?',
    [nextStatus, metadataServiceRequestId]
  )
}

async function updatePaymentByIntent(intentId, nextStatus) {
  if (!intentId) {
    return
  }

  const [rows] = await pool.query(
    `SELECT id, service_request_id
     FROM payments
     WHERE stripe_payment_intent_id = ?
     ORDER BY id DESC
     LIMIT 1`,
    [intentId]
  )

  if (rows.length === 0) {
    return
  }

  await pool.query(
    'UPDATE payments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [nextStatus, rows[0].id]
  )

  await pool.query(
    'UPDATE service_requests SET payment_status = ? WHERE id = ?',
    [nextStatus, rows[0].service_request_id]
  )
}

export async function stripeWebhook(req, res) {
  requireStripeConfigured()

  const signature = req.headers['stripe-signature']
  if (!signature || !env.stripe.webhookSecret) {
    return res.status(400).json({ success: false, message: 'Missing Stripe signature or webhook secret' })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, env.stripe.webhookSecret)
  } catch (error) {
    return res.status(400).json({ success: false, message: `Webhook signature verification failed: ${error.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    await upsertPaymentFromCheckoutSession(event.data.object, 'PAID')
  }

  if (event.type === 'checkout.session.expired') {
    await upsertPaymentFromCheckoutSession(event.data.object, 'CANCELLED')
  }

  if (event.type === 'payment_intent.payment_failed') {
    await updatePaymentByIntent(event.data.object.id, 'FAILED')
  }

  if (event.type === 'charge.refunded') {
    await updatePaymentByIntent(event.data.object.payment_intent, 'REFUNDED')
  }

  return res.json({ received: true })
}
