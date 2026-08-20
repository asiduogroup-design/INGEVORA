import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { Send } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function Contact() {
  const { t } = useLanguage()

  return (
    <main className="page">
      <Container>
        <SectionHeading
          title={t.contact.title}
          text={t.contact.text}
        />
        <form className="form-grid">
          <label>{t.contact.name}<input required name="name" /></label>
          <label>{t.contact.email}<input required type="email" name="email" /></label>
          <label>{t.contact.phone}<input name="phone" /></label>
          <label>{t.contact.company}<input name="company" /></label>
          <label>{t.contact.serviceType}
            <select required name="serviceType">
              {t.contact.serviceTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>{t.contact.budget}<input name="budget" /></label>
          <label>{t.contact.preferredContact}<select name="preferredContact">
            {t.contact.contactMethods.map((method) => (
              <option key={method}>{method}</option>
            ))}
          </select></label>
          <label className="full">{t.contact.projectDescription}<textarea required name="projectDescription" rows="6" /></label>
          <button className="btn btn-primary" type="submit"><Send size={18} /> {t.contact.sendMessage}</button>
        </form>
      </Container>
    </main>
  )
}
