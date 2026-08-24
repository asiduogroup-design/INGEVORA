import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CreditCard, FilePlus2, History, User } from 'lucide-react'
import { Container } from '../../components/common/Container'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingSpinner } from '../../components/common/LoadingSpinner'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { api } from '../../services/api'

const STATUS_CLASSES = {
  Submitted: 'status-submitted',
  'Under Review': 'status-review',
  Contacted: 'status-contacted',
  'In Progress': 'status-progress',
  Completed: 'status-completed',
  Cancelled: 'status-cancelled',
}

export function Profile() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [requests, setRequests] = useState([])
  const [status, setStatus] = useState('loading')
  const [savingQuoteId, setSavingQuoteId] = useState(null)
  const [payingRequestId, setPayingRequestId] = useState(null)

  const isAdmin = user?.role === 'admin'

  function loadRequests() {
    setStatus('loading')
    api
      .get('/service-requests')
      .then((response) => {
        setRequests(response.data?.data || [])
        setStatus('ready')
      })
      .catch(() => {
        setStatus('error')
      })
  }

  useEffect(() => {
    loadRequests()
  }, [])

  async function handleSaveQuote(requestId, event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    setSavingQuoteId(requestId)
    try {
      await api.patch(`/service-requests/${requestId}/quote`, {
        quotedAmount: form.get('quotedAmount'),
        status: form.get('status'),
      })
      loadRequests()
    } finally {
      setSavingQuoteId(null)
    }
  }

  async function handlePayNow(requestId) {
    setPayingRequestId(requestId)
    try {
      const response = await api.post('/payments/checkout-session', {
        serviceRequestId: requestId,
      })

      const checkoutUrl = response.data?.data?.checkoutUrl
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      }
    } catch {
      setStatus('error')
    } finally {
      setPayingRequestId(null)
    }
  }

  return (
    <main className="page">
      <Container className="profile-layout">
        <aside className="profile-sidebar">
          <span className="profile-avatar"><User size={26} /></span>
          <h2>{user?.name || t.profile.defaultUser}</h2>
          <p>{user?.email}</p>
          <nav className="profile-nav">
            <NavLink to="/service-request"><FilePlus2 size={16} /> {t.profile.newRequest}</NavLink>
            <span className="profile-nav-active"><History size={16} /> {t.profile.requestHistoryNav}</span>
            <NavLink to="/my-requests"><CreditCard size={16} /> {t.profile.paymentHistoryNav}</NavLink>
          </nav>
        </aside>

        <section className="profile-content">
          <h1>{t.profile.requestHistoryTitle}</h1>
          <p className="profile-subtitle">{t.profile.trackStatus}</p>

          {status === 'loading' && <LoadingSpinner />}
          {status === 'error' && <ErrorMessage message={t.profile.unableToLoad} />}
          {status === 'ready' && requests.length === 0 && (
            <EmptyState message={t.profile.noRequestsYet} />
          )}
          {status === 'ready' && requests.length > 0 && (
            <ul className="request-history">
              {requests.map((request, index) => (
                <li className="request-history-item" key={request.id ?? index}>
                  <div>
                    <h3>{request.title || request.service_type || t.profile.serviceRequestFallback}</h3>
                    <p>{request.description}</p>
                    <p>
                      <strong>{t.profile.quoteLabel}:</strong>{' '}
                      {request.quoted_amount ? `EUR ${request.quoted_amount}` : t.profile.notQuotedYet}
                    </p>
                    <p>
                      <strong>{t.profile.paymentStatusLabel}:</strong>{' '}
                      {request.payment_status || 'PENDING'}
                    </p>

                    {isAdmin && (
                      <form className="admin-quote-form" onSubmit={(event) => handleSaveQuote(request.id, event)}>
                        <label>
                          {t.profile.quoteInputLabel}
                          <input
                            name="quotedAmount"
                            type="number"
                            min="0.01"
                            step="0.01"
                            defaultValue={request.quoted_amount || ''}
                            required
                          />
                        </label>
                        <label>
                          {t.profile.requestStatusLabel}
                          <select name="status" defaultValue={request.status || 'Under Review'}>
                            {Object.keys(t.profile.statusLabels).map((statusKey) => (
                              <option key={statusKey} value={statusKey}>{statusKey}</option>
                            ))}
                          </select>
                        </label>
                        <button className="btn btn-secondary" type="submit" disabled={savingQuoteId === request.id}>
                          {savingQuoteId === request.id ? t.profile.savingQuote : t.profile.saveQuote}
                        </button>
                      </form>
                    )}

                    {!isAdmin && request.quoted_amount && request.payment_status !== 'PAID' && (
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled={payingRequestId === request.id}
                        onClick={() => handlePayNow(request.id)}
                      >
                        {payingRequestId === request.id ? t.profile.redirectingToStripe : t.profile.payNow}
                      </button>
                    )}
                  </div>
                  <span className={`status-pill ${STATUS_CLASSES[request.status] || 'status-submitted'}`}>
                    {t.profile.statusLabels[request.status] || t.profile.statusLabels.Submitted}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    </main>
  )
}
