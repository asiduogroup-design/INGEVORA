import { Container } from '../../components/common/Container'
import { SectionHeading } from '../../components/common/SectionHeading'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { api } from '../../services/api'

export function ServiceRequest() {
  const { t } = useLanguage()
  const [statusMessage, setStatusMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatusMessage('')
    setError('')

    const form = new FormData(event.currentTarget)

    try {
      await api.post('/service-requests', {
        title: form.get('title'),
        serviceType: form.get('serviceType'),
        budget: form.get('budget') || null,
        preferredContact: form.get('preferredContact') || null,
        description: form.get('description'),
      })

      event.currentTarget.reset()
      setStatusMessage('Service request submitted successfully. Our admin team will review and add a quote.')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to submit your request right now.')
    }
  }

  return (
    <main className="page">
      <Container>
        <SectionHeading
          title={t.serviceRequest.title}
          text={t.serviceRequest.text}
        />
        <form className="form-grid" onSubmit={handleSubmit}>
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
          {statusMessage && <p className="full status-contacted">{statusMessage}</p>}
          {error && <p className="full error-message">{error}</p>}
          <button className="btn btn-primary" type="submit"><Send size={18} /> {t.serviceRequest.submitRequest}</button>
        </form>
      </Container>
    </main>
  )
}
