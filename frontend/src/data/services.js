export const softwareServices = [
  { 
    title: 'Web Development',
    icon: 'Code2', 
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789191914/Create_a_premium_photorealisti_1_kkylbq.mp4' 
  },
  { title: 'Mobile App Development', icon: 'Smartphone' },
  { title: 'Custom Software', icon: 'Blocks' },
  { title: 'AI Solutions', icon: 'BrainCircuit' },
  { title: 'AI Automation', icon: 'Bot' },
  { title: 'Cloud Solutions', icon: 'CloudCog' },
  { title: 'API Development', icon: 'Webhook' },
  { 
    title: 'E-Commerce Development', 
    icon: 'ShoppingCart',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789028646/Create_a_second_premium_cin_ho4wcc.mp4'
  },
  { title: 'SaaS Development', icon: 'Cloud' },
  { 
    title: 'UI/UX Design', 
    icon: 'PenTool',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789191206/Create_a_premium_photorealisti_ajvxzu.mp4'
  },
  { 
    title: 'Software Maintenance', 
    icon: 'Wrench',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789030247/VID-20260907-WA0001_l40gml.mp4'
  },
  { title: 'Digital Transformation', icon: 'RefreshCw' },
]

export const electricalServices = [
  { title: 'House Wiring', icon: 'Cable' },
  { title: 'Electrical Installation', icon: 'PlugZap' },
  { title: 'Lighting', icon: 'Lightbulb' },
  { title: 'Electrical Panels', icon: 'PanelTop' },
  { title: 'Repairs', icon: 'Wrench' },
  { title: 'Maintenance', icon: 'Settings' },
  { 
    title: 'Safety Inspection', 
    icon: 'ShieldCheck',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789030543/VID-20260907-WA0005_xdxoid.mp4'
  },
  { title: 'Commercial Power Distribution', icon: 'Network' },
  { 
    title: 'Solar System Design', 
    icon: 'Sun',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789030577/VID-20260907-WA0003_nxo7so.mp4'
  },
  { title: 'EV Charger Installation', icon: 'BatteryCharging' },
  { title: 'Fault Detection', icon: 'SearchCheck' },
  { title: 'Energy Optimization', icon: 'Gauge' },
]

export const allServices = [
  ...softwareServices.map((service) => ({ ...service, category: 'Software' })),
  ...electricalServices.map((service) => ({ ...service, category: 'Electrical' })),
]
