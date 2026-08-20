import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useLanguage()

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    login({ email: form.get('email') })
    navigate('/pricing')
  }

  return (
    <main className="page auth-page">
      <h1>{t.auth.loginTitle}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>{t.auth.email}<input required type="email" name="email" /></label>
        <label>{t.auth.password}<input required type="password" name="password" /></label>
        <button className="btn btn-primary" type="submit">{t.auth.loginButton}</button>
        <p>{t.auth.newToIngevora} <Link to="/register">{t.auth.createAnAccount}</Link></p>
      </form>
    </main>
  )
}
