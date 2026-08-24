import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { api } from '../../services/api'

export function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useLanguage()
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setError('')

    const password = String(form.get('password') || '')
    const confirmPassword = String(form.get('confirmPassword') || '')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await api.post('/auth/register', {
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone') || null,
        company: form.get('company') || null,
        password,
      })

      const payload = response.data?.data
      login({
        ...payload?.user,
        token: payload?.token,
      })
      navigate('/profile')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to register right now.')
    }
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
        {error && <p className="error-message full">{error}</p>}
        <button className="btn btn-primary" type="submit">{t.auth.createAccountButton}</button>
        <p>{t.auth.alreadyHaveAccount} <Link to="/login">{t.auth.loginLink}</Link></p>
      </form>
    </main>
  )
}
