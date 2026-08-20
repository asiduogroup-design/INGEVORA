import { Container } from '../../components/common/Container'
import { Button } from '../../components/common/Button'
import {
  BadgeCheck,
  Bug,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Gauge,
  GitBranch,
  KeyRound,
  LayoutPanelTop,
  LockKeyhole,
  Rocket,
  SearchCheck,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const rescueServices = [
  ['Fix Bugs', 'Eliminate errors, crashes and logic failures with precision debugging.', Bug],
  ['Improve UI/UX', 'Transform rough AI-generated interfaces into polished user experiences.', LayoutPanelTop],
  ['Optimize Performance', 'Reduce load times, bundle size and interaction lag.', Gauge],
  ['Secure Your App', 'Harden authentication, permissions, input handling and OWASP risks.', ShieldCheck],
  ['Deploy to Production', 'CI/CD pipelines, Docker, cloud hosting and stable release flows.', Rocket],
  ['Add New Features', 'Extend your MVP with business-critical functionality.', Sparkles],
  ['Database Fixes', 'Repair schema issues, indexes, queries and data integrity problems.', Database],
  ['API Integration', 'Connect payments, auth, CRM, webhooks and third-party services.', GitBranch],
  ['Cloud Deployment', 'AWS, GCP, Vercel or VPS infrastructure with scalable setup.', Cloud],
  ['Maintenance', 'Monitoring, updates, issue resolution and long-term support.', Wrench],
  ['Payment Gateway', 'Stripe, PayPal or custom payment flows implemented reliably.', CreditCard],
  ['SEO Optimization', 'Technical SEO, metadata, sitemap and structured data.', SearchCheck],
]

const comparisonRows = [
  ['Code generation', 'Writes code snippets', 'Builds complete products'],
  ['Customization', 'Generic templates', 'Custom business solutions'],
  ['Strategy', 'No business insight', 'Consulting and planning included'],
  ['Testing', 'Limited or none', 'QA and end-to-end testing'],
  ['Support', 'No ongoing support', 'Dedicated long-term partner'],
  ['Performance', 'Unoptimized output', 'Performance-first architecture'],
  ['UI Quality', 'Basic or inconsistent', 'Premium UI/UX design'],
  ['Scalability', 'No scale planning', 'Production-grade architecture'],
  ['Maintenance', 'Not included', 'Lifecycle support options'],
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export function AIUpdates() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="ai-page">
      <section className="ai-hero">
        <Container>
          <motion.div
            className="ai-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="ai-pill"><ServerCog size={14} /> AI Rescue Service</span>
            <h1>
              Already Built Using AI? <strong>We'll Make It Production Ready.</strong>
            </h1>
            <p>
              We specialize in taking AI-generated code and transforming it into reliable,
              scalable, secure software your business can depend on.
            </p>
            <div className="hero-actions centered-actions">
              <Button to="/contact">Start AI Rescue</Button>
              <Button to="/software" variant="secondary">View Software Services</Button>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="ai-section">
        <Container>
          <motion.div
            className="ai-card-grid"
            variants={container}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, margin: '-80px' }}
          >
            {rescueServices.map(([title, description, Icon]) => (
              <motion.article className="ai-service-card" variants={item} key={title}>
                <span><Icon size={18} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section className="ai-section white-section">
        <Container>
          <div className="ai-section-title">
            <span className="ai-pill">Why Choose Us</span>
            <h2>AI Alone vs Our Team</h2>
            <p>
              Honest comparison: AI is a powerful tool, but production software needs
              engineering judgment, testing, deployment and support.
            </p>
          </div>

          <div className="ai-comparison-cards">
            <article className="ai-alone-card">
              <div className="comparison-title">
                <Code2 />
                <div>
                  <h3>AI Alone</h3>
                  <p>Limited capabilities</p>
                </div>
              </div>
              <ul>
                {comparisonRows.map(([feature, ai]) => (
                  <li key={feature}><span>x</span>{ai}</li>
                ))}
              </ul>
            </article>

            <article className="team-card">
              <div className="comparison-title">
                <BadgeCheck />
                <div>
                  <h3>Our Expert Team</h3>
                  <p>Production-ready delivery</p>
                </div>
                <strong>Recommended</strong>
              </div>
              <ul>
                {comparisonRows.map(([feature, , team]) => (
                  <li key={feature}><span>ok</span>{team}</li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="ai-section">
        <Container>
          <div className="comparison-table-card">
            <h2>Why Choose Us Instead of <span>AI Alone?</span></h2>
            <p>Clear delivery difference for business-critical software.</p>
            <div className="ai-table">
              <div className="ai-table-head">
                <strong>Feature</strong>
                <strong>AI Alone</strong>
                <strong>Our Team</strong>
              </div>
              {comparisonRows.map(([feature, ai, team]) => (
                <div className="ai-table-row" key={feature}>
                  <strong>{feature}</strong>
                  <p><LockKeyhole size={14} />{ai}</p>
                  <p><KeyRound size={14} />{team}</p>
                </div>
              ))}
            </div>
            <Button to="/contact">Get Started</Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
