USE ingevora;
CREATE TABLE IF NOT EXISTS service_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED,
  service_id BIGINT UNSIGNED,
  description TEXT NOT NULL,
  budget VARCHAR(80),
  preferred_contact_method VARCHAR(80),
  status ENUM('Submitted', 'Under Review', 'Contacted', 'In Progress', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Submitted',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_service_requests_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT fk_service_requests_service FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);
