import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { ServiceGrid } from '../../components/services/ServiceGrid'
import { SoftwareBackground } from '../../components/backgrounds/SoftwareBackground'
import { softwareServices } from '../../data/services'

export function Software() {
  return (
    <main className="page page-wrapper">
      <SoftwareBackground />
      <Container className="page-content">
        <SectionHeading
          eyebrow="Software & Technology"
          title="Build. Automate. Transform."
          text="Custom web, mobile, AI, automation and cloud solutions focused on reliability and business value."
        />
        <ServiceGrid services={softwareServices} type="software" />
      </Container>
    </main>
  )
}
