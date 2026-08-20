import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    login({ email: form.get('email') })
    navigate('/pricing')
  }

  return (
    <main className="page auth-page">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email<input required type="email" name="email" /></label>
        <label>Password<input required type="password" name="password" /></label>
        <button className="btn btn-primary" type="submit">Login</button>
        <p>New to INGEVORA? <Link to="/register">Create an account</Link></p>
      </form>
    </main>
  )
}
