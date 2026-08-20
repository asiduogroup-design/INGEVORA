USE ingevora;
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  phone VARCHAR(40),
  company VARCHAR(160),
  service_type VARCHAR(80) NOT NULL,
  project_description TEXT NOT NULL,
  budget VARCHAR(80),
  preferred_contact_method VARCHAR(80),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
