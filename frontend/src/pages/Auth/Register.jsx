import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'

export function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useLanguage()

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    login({ name: form.get('name'), email: form.get('email') })
    navigate('/pricing')
  }

  return (
    <main className="page auth-page">
      <h1>{t.auth.registerTitle}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>{t.auth.name}<input required name="name" /></label>
        <label>{t.auth.email}<input required type="email" name="email" /></label>
        <label>{t.auth.phone}<input name="phone" /></label>
        <label>{t.auth.company}<input name="company" /></label>
        <label>{t.auth.password}<input required type="password" name="password" /></label>
        <label>{t.auth.confirmPassword}<input required type="password" name="confirmPassword" /></label>
        <button className="btn btn-primary" type="submit">{t.auth.createAccountButton}</button>
        <p>{t.auth.alreadyHaveAccount} <Link to="/login">{t.auth.loginLink}</Link></p>
      </form>
    </main>
  )
}
