import { useLanguage } from '../../hooks/useLanguage'

export function MyRequests() {
  const { t } = useLanguage()

  return (
    <main className="page auth-page">
      <h1>{t.myRequests.title}</h1>
    </main>
  )
}
