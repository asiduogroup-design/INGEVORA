import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { Button } from '../../components/common/Button'
import { useLanguage } from '../../hooks/useLanguage'

export function Pricing() {
  const { t } = useLanguage()

  return (
    <main className="page">
      <Container>
        <SectionHeading title={t.pricing.title} text={t.pricing.text} />
        <div className="pricing-grid">
          {t.pricing.plans.map((plan) => (
            <article className="pricing-card" key={plan}>
              <h3>{plan}</h3>
              <p>{t.pricing.customEstimate}</p>
              <ul>
                {t.pricing.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button to="/service-request">{t.pricing.requestEstimate}</Button>
            </article>
          ))}
        </div>
      </Container>
    </main>
  )
}
