import { Cpu, Lightbulb, ShieldCheck, Zap } from 'lucide-react'
import { Container } from '../../components/common/Container'
import { Button } from '../../components/common/Button'
import { SectionHeading } from '../../components/common/SectionHeading'
import { LogoMark } from '../../components/branding/LogoMark'
import { useLanguage } from '../../hooks/useLanguage'
import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'

const EngineeringScene = lazy(() =>
  import('../../components/visuals/EngineeringScene').then((module) => ({
    default: module.EngineeringScene,
  })),
)

const process = [
  'Discover',
  'Research',
  'Planning',
  'UI/UX Designing',
  'Development',
  'Testing',
  'Deploying',
  'Support / Maintenance',
]

export function Home() {
  const { t } = useLanguage()

  return (
    <main>
      <section className="hero-section">
        <Container className="hero-grid">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="eyebrow">INGEVORA</p>
            <h1>{t.home.heroTitle}</h1>
            <p>{t.home.heroText}</p>
            <div className="hero-actions">
              <Button to="/software">Explore Software</Button>
              <Button to="/electrical" variant="secondary">
                Explore Electrical
              </Button>
              <Button to="/service-request" variant="ghost">
                Start a Project
              </Button>
            </div>
          </motion.div>
          <motion.div className="hero-visual" aria-hidden="true" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
            <Suspense fallback={null}>
              <EngineeringScene />
            </Suspense>
            <LogoMark />
            <span />
            <span />
            <span />
          </motion.div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading
            eyebrow="Two divisions"
            title="Software, electrical engineering and automation under one reliable system."
          />
          <div className="card-grid two">
            <article className="feature-card">
              <Cpu />
              <h3>Software & Technology</h3>
              <p>Web, mobile, custom software, AI automation, cloud systems and digital transformation.</p>
              <Button to="/software" variant="secondary">
                Explore Software
              </Button>
            </article>
            <article className="feature-card">
              <Zap />
              <h3>Electrical Services</h3>
              <p>Residential, commercial, hospitality, solar, EV charging, installation and maintenance.</p>
              <Button to="/electrical" variant="secondary">
                Explore Electrical
              </Button>
            </article>
          </div>
        </Container>
      </section>

      <section className="section alt-section">
        <Container>
          <SectionHeading
            eyebrow="AI & Automation"
            title="AI & Automation for the Next Generation of Business"
            text="Intelligent workflows, AI integration and project rescue for practical business outcomes."
          />
          <div className="card-grid">
            {['Engineering Excellence', 'Reliable Solutions', 'Modern Innovation', 'Long-Term Support'].map((item) => (
              <article className="mini-card" key={item}>
                <ShieldCheck />
                <h3>{item}</h3>
                <p>Clear, scalable delivery with careful engineering judgment.</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading eyebrow="Process" title="A disciplined delivery path from idea to support." />
          <ol className="process-list">
            {process.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="final-cta">
        <Container>
          <Lightbulb />
          <h2>Have a project in mind?</h2>
          <p>Let's build a reliable solution together.</p>
          <Button to="/contact">Contact Us</Button>
        </Container>
      </section>
    </main>
  )
}
