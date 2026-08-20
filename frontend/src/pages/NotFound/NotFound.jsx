import { useLanguage } from '../../hooks/useLanguage'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <main className="page auth-page">
      <h1>{t.notFound.title}</h1>
    </main>
  )
}
