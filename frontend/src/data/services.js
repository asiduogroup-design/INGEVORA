export const softwareServices = [
  { title: 'Web Development', icon: 'Code2' },
  { title: 'Mobile App Development', icon: 'Smartphone' },
  { title: 'Custom Software', icon: 'Blocks' },
  { title: 'AI Solutions', icon: 'BrainCircuit' },
  { title: 'AI Automation', icon: 'Bot' },
  { title: 'Cloud Solutions', icon: 'CloudCog' },
  { title: 'API Development', icon: 'Webhook' },
  { title: 'E-Commerce Development', icon: 'ShoppingCart' },
  { title: 'SaaS Development', icon: 'Cloud' },
  { title: 'UI/UX Design', icon: 'PenTool' },
  { title: 'Software Maintenance', icon: 'Wrench' },
  { title: 'Digital Transformation', icon: 'RefreshCw' },
]

export const electricalServices = [
  { title: 'House Wiring', icon: 'Cable' },
  { title: 'Electrical Installation', icon: 'PlugZap' },
  { title: 'Lighting', icon: 'Lightbulb' },
  { title: 'Electrical Panels', icon: 'PanelTop' },
  { title: 'Repairs', icon: 'Wrench' },
  { title: 'Maintenance', icon: 'Settings' },
  { title: 'Safety Inspection', icon: 'ShieldCheck' },
  { title: 'Commercial Power Distribution', icon: 'Network' },
  { title: 'Solar System Design', icon: 'Sun' },
  { title: 'EV Charger Installation', icon: 'BatteryCharging' },
  { title: 'Fault Detection', icon: 'SearchCheck' },
  { title: 'Energy Optimization', icon: 'Gauge' },
]

export const allServices = [
  ...softwareServices.map((service) => ({ ...service, category: 'Software' })),
  ...electricalServices.map((service) => ({ ...service, category: 'Electrical' })),
]
