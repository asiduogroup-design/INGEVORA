import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { Button } from '../../components/common/Button'

export function Pricing() {
  return (
    <main className="page">
      <Container>
        <SectionHeading title="Pricing" text="Pricing is available for logged-in users so requests can be matched to project scope." />
        <div className="pricing-grid">
          {['Software Project', 'Electrical Service', 'AI Automation'].map((plan) => (
            <article className="pricing-card" key={plan}>
              <h3>{plan}</h3>
              <p>Custom estimate</p>
              <ul>
                <li>Scope review</li>
                <li>Planning and delivery milestones</li>
                <li>Support options</li>
              </ul>
              <Button to="/service-request">Request Estimate</Button>
            </article>
          ))}
        </div>
      </Container>
    </main>
  )
}
