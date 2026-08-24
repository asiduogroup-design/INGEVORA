import { useEffect, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { EmptyState } from '../../components/common/EmptyState'
import { api } from '../../services/api'

export function MyRequests() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('loading')
  const [payments, setPayments] = useState([])

  useEffect(() => {
    api
      .get('/payments')
      .then((response) => {
        setPayments(response.data?.data || [])
        setStatus('ready')
      })
      .catch(() => {
        setStatus('error')
      })
  }, [])

  return (
    <main className="page auth-page payments-page">
      <h1>{t.myRequests.title}</h1>
      {status === 'loading' && <LoadingSpinner />}
      {status === 'error' && <ErrorMessage message={t.myRequests.loadError} />}
      {status === 'ready' && payments.length === 0 && <EmptyState message={t.myRequests.empty} />}
      {status === 'ready' && payments.length > 0 && (
        <ul className="request-history">
          {payments.map((payment) => (
            <li className="request-history-item" key={payment.id}>
              <div>
                <h3>{payment.service_request_title || `${t.myRequests.requestFallback} #${payment.service_request_id}`}</h3>
                <p>{t.myRequests.amountLabel}: EUR {payment.amount}</p>
                <p>{t.myRequests.statusLabel}: {payment.status}</p>
                <p>{t.myRequests.referenceLabel}: {payment.stripe_session_id}</p>
              </div>
              <span className="status-pill status-contacted">{payment.status}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
