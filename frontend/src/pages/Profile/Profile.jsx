import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FilePlus2, History, User } from 'lucide-react'
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

  useEffect(() => {
    let active = true
    api
      .get('/service-requests')
      .then((response) => {
        if (!active) return
        setRequests(response.data?.data || [])
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

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
                    <h3>{request.title || request.serviceType || t.profile.serviceRequestFallback}</h3>
                    <p>{request.description}</p>
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
