import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { ServiceGrid } from '../../components/services/ServiceGrid'
import { ElectricalBackground } from '../../components/backgrounds/ElectricalBackground'
import { electricalServices } from '../../data/services'

export function Electrical() {
  return (
    <main className="page page-wrapper">
      <ElectricalBackground />
      <Container className="page-content">
        <SectionHeading
          eyebrow="Electrical Services"
          title="Powering Spaces. Building Smarter."
          text="Reliable electrical engineering and energy solutions for residential, commercial and modern infrastructure."
        />
        <ServiceGrid services={electricalServices} type="electrical" />
      </Container>
    </main>
  )
}
