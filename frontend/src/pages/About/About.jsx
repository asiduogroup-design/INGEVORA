import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'

export function About() {
  return (
    <main className="page">
      <Container>
        <SectionHeading
          title="Engineering the Future with Reliability & Automation"
          text="INGEVORA combines software, AI, automation and electrical engineering into one practical engineering vision."
        />
      </Container>
    </main>
  )
}
