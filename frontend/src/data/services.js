export const softwareServices = [
  { 
    title: 'Web Development',
    icon: 'Code2', 
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789191914/Create_a_premium_photorealisti_1_kkylbq.mp4' 
  },
  { 
    title: 'Mobile App Development',
     icon: 'Smartphone',
     videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789453016/Create_a_premium_photorealisti_2_ypjnsd.mp4'
     },
  { 
    title: 'Custom Software', 
    icon: 'Blocks',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789453352/Create_a_premium_photorealisti_3_gb6tfy.mp4'
   },
  { 
    title: 'AI Solutions',
     icon: 'BrainCircuit',
     videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789453642/Create_a_premium_photorealisti_4_efraen.mp4'
  },
  { 
    title: 'AI Automation', 
    icon: 'Bot',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789453976/Create_a_premium_photorealisti_5_aauftd.mp4'
 },
  { 
    title: 'Cloud Solutions', 
    icon: 'CloudCog',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789454359/Create_a_premium_photorealisti_6_lokc0l.mp4'
  },
  {
     title: 'API Development', 
     icon: 'Webhook',
     videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789540542/Create_a_premium_photorealisti_8_wwljwr.mp4'
     },
  { 
    title: 'E-Commerce Development', 
    icon: 'ShoppingCart',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789028646/Create_a_second_premium_cin_ho4wcc.mp4'
  },
  {
     title: 'SaaS Development',
      icon: 'Cloud',
      videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789454672/Create_a_premium_photorealisti_7_kmxzsg.mp4'
 },
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
  { 
    title: 'Digital Transformation', 
    icon: 'RefreshCw',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789541019/Create_a_premium_photorealisti_9_z6oam6.mp4'
   },
]

export const electricalServices = [
  { 
    title: 'House Wiring',
     icon: 'Cable',
     videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789541430/Create_a_premium_photorealisti_10_xwaftx.mp4'
     },
  {
     title: 'Electrical Installation',
      icon: 'PlugZap',
      videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789541838/Create_a_premium_photorealisti_11_cugk3i.mp4'
     },
  { 
    title: 'Lighting',
     icon: 'Lightbulb',
     videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789631228/in_above_video_why_car_is_show_mmqigx.mp4'
     },
  { 
    title: 'Electrical Panels',
     icon: 'PanelTop',
     videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789631582/Create_a_premium_photorealisti_13_fq0fiz.mp4'
     },
  { 
    title: 'Repairs', 
    icon: 'Wrench',
    videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789631908/Create_a_premium_photorealisti_14_s2swnd.mp4' 
},
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
  { 
    title: 'EV Charger Installation',
     icon: 'BatteryCharging',
     videoUrl: 'https://res.cloudinary.com/dlx9tnj7p/video/upload/v1789630595/Create_a_premium_photorealisti_12_j1hihr.mp4'
     },
  { title: 'Fault Detection', icon: 'SearchCheck' },
  { title: 'Energy Optimization', icon: 'Gauge' },
]

export const allServices = [
  ...softwareServices.map((service) => ({ ...service, category: 'Software' })),
  ...electricalServices.map((service) => ({ ...service, category: 'Electrical' })),
]
