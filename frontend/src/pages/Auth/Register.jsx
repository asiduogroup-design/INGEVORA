import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    login({ name: form.get('name'), email: form.get('email') })
    navigate('/pricing')
  }

  return (
    <main className="page auth-page">
      <h1>Register</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Name<input required name="name" /></label>
        <label>Email<input required type="email" name="email" /></label>
        <label>Phone<input name="phone" /></label>
        <label>Company<input name="company" /></label>
        <label>Password<input required type="password" name="password" /></label>
        <label>Confirm Password<input required type="password" name="confirmPassword" /></label>
        <button className="btn btn-primary" type="submit">Create Account</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </main>
  )
}
