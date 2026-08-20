USE ingevora;

INSERT INTO services (name, category, description) VALUES
('Web Development', 'Software', 'Responsive websites and web applications.'),
('AI Solutions', 'AI', 'AI-powered applications and intelligent workflows.'),
('Residential Electrical', 'Electrical', 'Reliable home electrical installation and maintenance.'),
('Solar Installation', 'Solar', 'Solar system design, installation and optimization.')
ON DUPLICATE KEY UPDATE name = VALUES(name);
