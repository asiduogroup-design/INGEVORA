import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { ServiceGrid } from '../../components/services/ServiceGrid'
import { SoftwareBackground } from '../../components/backgrounds/SoftwareBackground'
import { softwareServices } from '../../data/services'
import { useLanguage } from '../../hooks/useLanguage'

export function Software() {
  const { t } = useLanguage()

  return (
    <main className="page page-wrapper">
      <SoftwareBackground />
      <Container className="page-content">
        <SectionHeading
          eyebrow={t.software.eyebrow}
          title={t.software.title}
          text={t.software.text}
        />
        <ServiceGrid services={softwareServices} type="software" />
      </Container>
    </main>
  )
}
