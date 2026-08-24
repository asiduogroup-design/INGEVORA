import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function PaymentSuccess() {
  const { t } = useLanguage()

  return (
    <main className="page auth-page payment-result-page">
      <CheckCircle2 size={48} className="payment-result-icon success" />
      <h1>{t.myRequests.successTitle}</h1>
      <p>{t.myRequests.successMessage}</p>
      <div className="card-actions">
        <Link className="btn btn-secondary" to="/my-requests">{t.myRequests.viewPayments}</Link>
        <Link className="btn btn-primary" to="/profile">{t.myRequests.backToRequests}</Link>
      </div>
    </main>
  )
}
