USE ingevora;

ALTER TABLE service_requests
  ADD COLUMN title VARCHAR(180) NULL AFTER service_id,
  ADD COLUMN service_type VARCHAR(80) NULL AFTER title,
  ADD COLUMN quoted_amount DECIMAL(10,2) NULL AFTER status,
  ADD COLUMN payment_status ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING' AFTER quoted_amount;

CREATE TABLE IF NOT EXISTS payments (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  service_request_id BIGINT UNSIGNED NOT NULL,
  stripe_session_id VARCHAR(255) NOT NULL,
  stripe_payment_intent_id VARCHAR(255) NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'EUR',
  status ENUM('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_payments_service_request FOREIGN KEY (service_request_id) REFERENCES service_requests(id) ON DELETE CASCADE,
  UNIQUE KEY uq_payments_stripe_session_id (stripe_session_id),
  UNIQUE KEY uq_payments_stripe_payment_intent_id (stripe_payment_intent_id),
  INDEX idx_payments_user (user_id),
  INDEX idx_payments_service_request (service_request_id),
  INDEX idx_payments_status (status)
);
