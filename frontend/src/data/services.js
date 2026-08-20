export const softwareServices = [
  'Web Development',
  'Mobile App Development',
  'Custom Software',
  'AI Solutions',
  'AI Automation',
  'Cloud Solutions',
  'API Development',
  'E-Commerce Development',
  'SaaS Development',
  'UI/UX Design',
  'Software Maintenance',
  'Digital Transformation',
]

export const electricalServices = [
  'House Wiring',
  'Electrical Installation',
  'Lighting',
  'Electrical Panels',
  'Repairs',
  'Maintenance',
  'Safety Inspection',
  'Commercial Power Distribution',
  'Solar System Design',
  'EV Charger Installation',
  'Fault Detection',
  'Energy Optimization',
]

export const allServices = [
  ...softwareServices.map((title) => ({ title, category: 'Software' })),
  ...electricalServices.map((title) => ({ title, category: 'Electrical' })),
]
