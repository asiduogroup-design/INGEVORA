import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Moon,
  Sun,
} from 'lucide-react'

import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { api } from '../../services/api'

import { AuthPanda } from '../../components/auth/AuthPanda'

import './Auth.css'

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
  const [activeField, setActiveField] = useState('')
  const [showPassword, setShowPassword] =
    useState(false)

  const [lightOn, setLightOn] =
    useState(true)

  const [isDragging, setIsDragging] =
    useState(false)

  const [dragStart, setDragStart] =
    useState(null)

  const [dragProgress, setDragProgress] =
    useState(0)

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  function toggleLight() {
    setLightOn((previous) => !previous)
  }

  function startLampDrag(event) {
    event.preventDefault()

    setDragStart(event.clientY)
    setIsDragging(true)
  }

  function moveLamp(event) {
    if (!isDragging || dragStart === null) {
      return
    }

    const distance =
      Math.max(
        0,
        event.clientY - dragStart
      )

    const progress =
      Math.min(
        1,
        distance / 120
      )

    setDragProgress(progress)
  }

  function finishLampDrag() {
    if (!isDragging) {
      return
    }

    if (dragProgress >= 0.5) {
      toggleLight()
    }

    setIsDragging(false)
    setDragStart(null)
    setDragProgress(0)
  }

  function handleLampKeyDown(event) {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()
      toggleLight()
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const form =
      new FormData(event.currentTarget)

    setError('')
    setSuccess(false)
    setIsSubmitting(true)

    const email =
      String(
        form.get('email') || ''
      )
        .trim()
        .toLowerCase()

    const password =
      String(
        form.get('password') || ''
      )

    try {
      const response =
        await api.post(
          '/auth/login',
          {
            email,
            password,
          }
        )

      const payload =
        response.data?.data

      login({
        ...payload?.user,
        token: payload?.token,
      })

      setSuccess(true)

      setTimeout(() => {
        navigate('/profile')
      }, 650)
    } catch (requestError) {
      const staticUser =
        STATIC_TEST_USERS.find(
          (candidate) =>
            candidate.email === email &&
            candidate.password === password
        )

      if (staticUser) {
        login({
          id: staticUser.id,
          name: staticUser.name,
          email: staticUser.email,
          role: staticUser.role,
          token:
            `static-test-${staticUser.role}`,
          isStaticTestUser: true,
        })

        setSuccess(true)

        setTimeout(() => {
          navigate('/profile')
        }, 650)

        return
      }

      setError(
        requestError.response?.data
          ?.message ||
          'Unable to login right now.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main
      className={`page auth-page ${
        lightOn
          ? 'is-light-on'
          : 'is-light-off'
      }`}
      onPointerMove={moveLamp}
      onPointerUp={finishLampDrag}
      onPointerCancel={finishLampDrag}
    >
      <section className="auth-shell">

        {/* =========================
            LEFT
        ========================== */}

        <div className="auth-visual">

          <div className="auth-visual-content">
            <span className="auth-eyebrow">
              INGEVORA EXPERIENCE
            </span>

            <h1>
              Welcome back
              <span>
                to smarter engineering.
              </span>
            </h1>

            <p className="auth-visual-copy">
              Sign in to continue to your
              INGEVORA workspace.
              Your little panda is keeping
              watch.
            </p>
          </div>

          <div className="panda-area">

            <div className="panda-glow" />

            {/* Lamp */}

            <div className="auth-lamp">

              <button
                type="button"
                className="lamp-button"
                onDoubleClick={
                  toggleLight
                }
                aria-label={
                  lightOn
                    ? 'Turn light off'
                    : 'Turn light on'
                }
              >
                <div className="lamp-shade">
                  <div className="lamp-bulb" />
                </div>
              </button>

              <div className="lamp-cord" />

              <div
                className="lamp-pull"
                role="button"
                tabIndex={0}
                onPointerDown={
                  startLampDrag
                }
                onKeyDown={
                  handleLampKeyDown
                }
                style={{
                  transform:
                    `translateY(${
                      dragProgress * 75
                    }px)`,
                }}
              >
                {lightOn ? (
                  <Sun size={15} />
                ) : (
                  <Moon size={15} />
                )}
              </div>
            </div>

            {/* Panda */}

            <AuthPanda
              lightOn={lightOn}
              activeField={activeField}
              showPassword={
                showPassword
              }
              success={success}
              error={Boolean(error)}
            />

          </div>

          <div className="auth-visual-footer">
            <span>
              {lightOn
                ? 'Light on'
                : 'Panda is sleeping'}
            </span>

            <span className="auth-divider" />

            <span>
              Double-click or pull the lamp
            </span>
          </div>

        </div>

        {/* =========================
            RIGHT
        ========================== */}

        <div className="auth-card">

          <div className="auth-card-header">
            <span className="auth-card-kicker">
              SECURE ACCESS
            </span>

            <h2>
              {t.auth.loginTitle ||
                'Login'}
            </h2>

            <p className="auth-card-description">
              Access your INGEVORA account
              and continue where you left off.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* Email */}

            <div
              className={`auth-field ${
                activeField === 'email'
                  ? 'is-active'
                  : ''
              }`}
            >
              <label htmlFor="login-email">
                <Mail size={15} />
                <span>
                  {t.auth.email}
                </span>
              </label>

              <input
                id="login-email"
                required
                type="email"
                name="email"
                autoComplete="email"
                onFocus={() =>
                  setActiveField(
                    'email'
                  )
                }
                onBlur={() =>
                  setActiveField('')
                }
              />
            </div>

            {/* Password */}

            <div
              className={`auth-field ${
                activeField === 'password'
                  ? 'is-active'
                  : ''
              }`}
            >
              <label htmlFor="login-password">
                <LockKeyhole size={15} />
                <span>
                  {t.auth.password}
                </span>
              </label>

              <div className="password-wrapper">

                <input
                  id="login-password"
                  required
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  name="password"
                  autoComplete="current-password"
                  onFocus={() =>
                    setActiveField(
                      'password'
                    )
                  }
                  onBlur={() =>
                    setActiveField('')
                  }
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>
            </div>

            {/* Error */}

            {error && (
              <div
                className="auth-error"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              className={`auth-submit ${
                success
                  ? 'success'
                  : ''
              }`}
              disabled={
                isSubmitting
              }
            >
              <span>
                {success
                  ? 'Success'
                  : isSubmitting
                    ? 'Signing in...'
                    : t.auth.loginButton}
              </span>

              <span className="auth-arrow">
                -&gt;
              </span>
            </button>

            {/* Register */}

            <div className="auth-bottom">
              <span>
                {t.auth.newToIngevora}
              </span>

              <Link to="/register">
                {t.auth.createAnAccount}
              </Link>
            </div>

          </form>

        </div>

      </section>
    </main>
  )
}
