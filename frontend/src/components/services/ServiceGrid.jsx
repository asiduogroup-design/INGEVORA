import { ArrowRight, Cpu, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'
import { useLanguage } from '../../hooks/useLanguage'

export function ServiceGrid({ services, type = 'software' }) {
  const { t } = useLanguage()

  return (
    <div className="service-grid">
      {services.map((service, index) => {
        const title = typeof service === 'string' ? service : service.title
        const category = typeof service === 'string' ? type : service.category
        const Icon = category === 'Electrical' || type === 'electrical' ? Zap : Cpu
        const categoryLabel = type === 'electrical' ? t.common.nav.electrical : t.common.nav.software
        return (
          <motion.article
            className="service-card"
            key={`${category}-${title}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.18) }}
          >
            <Icon />
            <span>{categoryLabel}</span>
            <h3>{t.services.items[title] || title}</h3>
            <p>{t.services.cardDescription}</p>
            <div className="card-actions">
              <Button to="/contact" variant="secondary">{t.services.learnMore}</Button>
              <Button to="/service-request" variant="ghost">{t.services.requestService} <ArrowRight size={16} /></Button>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
