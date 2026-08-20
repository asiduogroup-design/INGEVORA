import { Container } from '../../components/common/Container'
import { Button } from '../../components/common/Button'
import {
  Bug,
  Cloud,
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
import { useLanguage } from '../../hooks/useLanguage'

const rescueIcons = [Bug, LayoutPanelTop, Gauge, ShieldCheck, Rocket, Sparkles, Database, GitBranch, Cloud, Wrench, CreditCard, SearchCheck]

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
  const { t } = useLanguage()

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
            <span className="ai-pill"><ServerCog size={14} /> {t.ai.pill}</span>
            <h1>
              {t.ai.titleLine1} <strong>{t.ai.titleStrong}</strong>
            </h1>
            <p>
              {t.ai.text}
            </p>
            <div className="hero-actions centered-actions">
              <Button to="/contact">{t.ai.startRescue}</Button>
              <Button to="/software" variant="secondary">{t.ai.viewSoftware}</Button>
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
            {t.ai.rescueServices.map(([title, description], index) => {
              const Icon = rescueIcons[index]
              return (
                <motion.article className="ai-service-card" variants={item} key={title}>
                  <span><Icon size={18} /></span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </Container>
      </section>

      <section className="ai-section">
        <Container>
          <div className="comparison-table-card">
            <h2>{t.ai.comparisonTitle}<span>{t.ai.comparisonTitleStrong}</span></h2>
            <p>{t.ai.comparisonText}</p>
            <div className="ai-table">
              <div className="ai-table-head">
                <strong>{t.ai.tableHead[0]}</strong>
                <strong>{t.ai.tableHead[1]}</strong>
                <strong>{t.ai.tableHead[2]}</strong>
              </div>
              {t.ai.comparisonRows.map(([feature, ai, team]) => (
                <div className="ai-table-row" key={feature}>
                  <strong>{feature}</strong>
                  <p><LockKeyhole size={14} />{ai}</p>
                  <p><KeyRound size={14} />{team}</p>
                </div>
              ))}
            </div>
            <Button to="/contact">{t.ai.getStarted}</Button>
          </div>
        </Container>
      </section>
    </main>
  )
}
