import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { useLanguage } from '../../hooks/useLanguage'

export function About() {
  const { t } = useLanguage()

  return (
    <main className="page">
      <Container>
        <SectionHeading
          title={t.about.title}
          text={t.about.text}
        />
      </Container>
    </main>
  )
}
