import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'
import { useLanguage } from '../../hooks/useLanguage'

export function ServiceGrid({ services, type = 'software' }) {
  const { t } = useLanguage()

  return (
    <div className="service-grid">
      {services.map((service, index) => {
        const title = service.title || service
        const icon = service.icon || (type === 'electrical' ? 'Zap' : 'Cpu')
        const category = service.category || type
        const categoryLabel = type === 'electrical' ? t.common.nav.electrical : t.common.nav.software
        const IconComponent = Icons[icon] || Icons.Cpu
        const description = t.services.descriptions?.[title] || t.services.cardDescription

        return (
          <motion.article
            className={`service-card ${service.videoUrl ? 'service-card-with-video' : ''}`}
            key={`${category}-${title}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.18) }}
          >
            {service.videoUrl ? (
              <div className="service-card-container">
                <div className="service-card-content">
                  <IconComponent />
                  <span>{categoryLabel}</span>
                  <h3>{t.services.items[title] || title}</h3>
                  <p>{description}</p>
                  <div className="card-actions">
                    <Button to="/contact" variant="secondary">{t.services.learnMore}</Button>
                    <Button to="/service-request" variant="ghost">{t.services.requestService} <ArrowRight size={16} /></Button>
                  </div>
                </div>
                <div className="service-card-video">
                  <video 
                    src={service.videoUrl}
                    controls
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            ) : (
              <>
                <IconComponent />
                <span>{categoryLabel}</span>
                <h3>{t.services.items[title] || title}</h3>
                <p>{description}</p>
                <div className="card-actions">
                  <Button to="/contact" variant="secondary">{t.services.learnMore}</Button>
                  <Button to="/service-request" variant="ghost">{t.services.requestService} <ArrowRight size={16} /></Button>
                </div>
              </>
            )}
          </motion.article>
        )
      })}
    </div>
  )
}
