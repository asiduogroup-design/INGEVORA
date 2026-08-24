import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { api } from '../../services/api'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useLanguage()
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setError('')

    try {
      const response = await api.post('/auth/login', {
        email: form.get('email'),
        password: form.get('password'),
      })

      const payload = response.data?.data
      login({
        ...payload?.user,
        token: payload?.token,
      })
      navigate('/profile')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to login right now.')
    }
  }

  return (
    <main className="page auth-page">
      <h1>{t.auth.loginTitle}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>{t.auth.email}<input required type="email" name="email" /></label>
        <label>{t.auth.password}<input required type="password" name="password" /></label>
        {error && <p className="error-message">{error}</p>}
        <button className="btn btn-primary" type="submit">{t.auth.loginButton}</button>
        <p>{t.auth.newToIngevora} <Link to="/register">{t.auth.createAnAccount}</Link></p>
      </form>
    </main>
  )
}
