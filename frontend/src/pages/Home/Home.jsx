import {
  ArrowRight,
  Code2,
  Cpu,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'
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

const processMeta = [
  { icon: Users, gradient: 'grad-blue' },
  { icon: Search, gradient: 'grad-cyan' },
  { icon: Target, gradient: 'grad-purple' },
  { icon: Palette, gradient: 'grad-pink' },
  { icon: Code2, gradient: 'grad-indigo' },
  { icon: ShieldCheck, gradient: 'grad-green' },
  { icon: Rocket, gradient: 'grad-cyan2' },
  { icon: Wrench, gradient: 'grad-violet' },
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
              <Button to="/software">{t.home.exploreSoftware}</Button>
              <Button to="/electrical" variant="secondary">
                {t.home.exploreElectrical}
              </Button>
              <Button to="/service-request" variant="ghost">
                {t.home.startProject}
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
            eyebrow={t.home.divisionsEyebrow}
            title={t.home.divisionsTitle}
          />
          <div className="card-grid two">
            <article className="feature-card">
              <Cpu />
              <h3>{t.home.softwareCardTitle}</h3>
              <p>{t.home.softwareCardText}</p>
              <Button to="/software" variant="secondary">
                {t.home.exploreSoftware}
              </Button>
            </article>
            <article className="feature-card">
              <Zap />
              <h3>{t.home.electricalCardTitle}</h3>
              <p>{t.home.electricalCardText}</p>
              <Button to="/electrical" variant="secondary">
                {t.home.exploreElectrical}
              </Button>
            </article>
          </div>
        </Container>
      </section>

      <section className="section alt-section">
        <Container>
          <SectionHeading
            eyebrow={t.home.aiEyebrow}
            title={t.home.aiTitle}
            text={t.home.aiText}
          />
          <div className="card-grid">
            {t.home.aiCards.map((item) => (
              <article className="mini-card" key={item}>
                <ShieldCheck />
                <h3>{item}</h3>
                <p>{t.home.aiCardText}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="process-heading">
            <span className="ai-pill"><Wrench size={14} /> {t.home.howWeWork}</span>
            <h2>{t.home.processTitle}</h2>
            <p>{t.home.processText}</p>
          </div>
          <ol className="process-list">
            {t.home.process.map((step, index) => {
              const meta = processMeta[index]
              return (
                <li key={step.title}>
                  <div className="process-icon-wrap">
                    <span className={`process-icon ${meta.gradient}`}>
                      <meta.icon size={20} />
                    </span>
                    <span className="process-step-number">{index + 1}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              )
            })}
          </ol>
        </Container>
      </section>

      <section className="final-cta">
        <Container>
          <span className="ai-pill"><Sparkles size={14} /> {t.home.ctaPill}</span>
          <h2>
            {t.home.ctaTitleLine1}
            <br />
            <span className="gradient-text">{t.home.ctaTitleGradient}</span>
          </h2>
          <p>{t.home.ctaText}</p>
          <div className="hero-actions centered-actions">
            <Button to="/contact"><Sparkles size={16} /> {t.home.ctaPrimary}</Button>
            <Button to="/service-request" variant="ghost">
              {t.home.ctaSecondary} <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
