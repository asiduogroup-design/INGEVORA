import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { Send } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function ServiceRequest() {
  const { t } = useLanguage()

  return (
    <main className="page">
      <Container>
        <SectionHeading
          title={t.serviceRequest.title}
          text={t.serviceRequest.text}
        />
        <form className="form-grid">
          <label>{t.serviceRequest.projectTitle}<input required name="title" /></label>
          <label>{t.serviceRequest.serviceType}
            <select required name="serviceType">
              {t.serviceRequest.serviceTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>{t.serviceRequest.budget}<input name="budget" /></label>
          <label>{t.serviceRequest.preferredContact}<select name="preferredContact">
            {t.serviceRequest.contactMethods.map((method) => (
              <option key={method}>{method}</option>
            ))}
          </select></label>
          <label className="full">{t.serviceRequest.projectDescription}<textarea required name="description" rows="6" /></label>
          <button className="btn btn-primary" type="submit"><Send size={18} /> {t.serviceRequest.submitRequest}</button>
        </form>
      </Container>
    </main>
  )
}
