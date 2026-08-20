import { ArrowRight, Cpu, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../common/Button'

export function ServiceGrid({ services, type = 'software' }) {
  return (
    <div className="service-grid">
      {services.map((service, index) => {
        const title = typeof service === 'string' ? service : service.title
        const category = typeof service === 'string' ? type : service.category
        const Icon = category === 'Electrical' || type === 'electrical' ? Zap : Cpu
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
            <span>{category}</span>
            <h3>{title}</h3>
            <p>Reliable planning, implementation, testing and long-term support for business-critical work.</p>
            <div className="card-actions">
              <Button to="/contact" variant="secondary">Learn More</Button>
              <Button to="/service-request" variant="ghost">Request Service <ArrowRight size={16} /></Button>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
