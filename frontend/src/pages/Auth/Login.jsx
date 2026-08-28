import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { api } from '../../services/api'

const STATIC_TEST_USERS = [
  {
    id: 'static-user-1',
    name: 'Test User',
    email: 'user1@ingevora.com',
    password: 'user1@123',
    role: 'user',
  },
  {
    id: 'static-admin-1',
    name: 'Admin',
    email: 'admin@ingevora.com',
    password: 'admin@123',
    role: 'admin',
  },
]

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
      const email = String(form.get('email') || '').trim().toLowerCase()
      const password = String(form.get('password') || '')

      const response = await api.post('/auth/login', {
        email,
        password,
      })

      const payload = response.data?.data
      login({
        ...payload?.user,
        token: payload?.token,
      })
      navigate('/profile')
    } catch (requestError) {
      const email = String(form.get('email') || '').trim().toLowerCase()
      const password = String(form.get('password') || '')
      const staticUser = STATIC_TEST_USERS.find(
        (candidate) => candidate.email === email && candidate.password === password,
      )

      if (staticUser) {
        login({
          id: staticUser.id,
          name: staticUser.name,
          email: staticUser.email,
          role: staticUser.role,
          token: `static-test-${staticUser.role}`,
          isStaticTestUser: true,
        })
        navigate('/profile')
        return
      }

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
