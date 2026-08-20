import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { ServiceGrid } from '../../components/services/ServiceGrid'
import { ElectricalBackground } from '../../components/backgrounds/ElectricalBackground'
import { electricalServices } from '../../data/services'
import { useLanguage } from '../../hooks/useLanguage'

export function Electrical() {
  const { t } = useLanguage()

  return (
    <main className="page page-wrapper">
      <ElectricalBackground />
      <Container className="page-content">
        <SectionHeading
          eyebrow={t.electrical.eyebrow}
          title={t.electrical.title}
          text={t.electrical.text}
        />
        <ServiceGrid services={electricalServices} type="electrical" />
      </Container>
    </main>
  )
}
