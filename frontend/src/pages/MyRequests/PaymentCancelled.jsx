import { Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export function PaymentCancelled() {
  const { t } = useLanguage()

  return (
    <main className="page auth-page payment-result-page">
      <XCircle size={48} className="payment-result-icon cancelled" />
      <h1>{t.myRequests.cancelTitle}</h1>
      <p>{t.myRequests.cancelMessage}</p>
      <div className="card-actions">
        <Link className="btn btn-secondary" to="/profile">{t.myRequests.tryAgain}</Link>
        <Link className="btn btn-primary" to="/my-requests">{t.myRequests.viewPayments}</Link>
      </div>
    </main>
  )
}
