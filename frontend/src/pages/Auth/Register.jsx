import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Moon,
  Phone,
  Sun,
  UserRound,
} from 'lucide-react'

import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { api } from '../../services/api'

import { AuthPanda } from '../../components/auth/AuthPanda'

import './Auth.css'

export function Register() {
  const navigate = useNavigate()

  const { login } = useAuth()
  const { t } = useLanguage()

  const [error, setError] =
    useState('')

  const [activeField, setActiveField] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false)

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
    setLightOn(
      (previous) => !previous
    )
  }

  function startLampDrag(event) {
    event.preventDefault()

    setDragStart(event.clientY)
    setIsDragging(true)
  }

  function moveLamp(event) {
    if (
      !isDragging ||
      dragStart === null
    ) {
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

    const password =
      String(
        form.get('password') || ''
      )

    const confirmPassword =
      String(
        form.get(
          'confirmPassword'
        ) || ''
      )

    if (
      password !==
      confirmPassword
    ) {
      setError(
        'Passwords do not match.'
      )

      setIsSubmitting(false)

      return
    }

    try {
      const response =
        await api.post(
          '/auth/register',
          {
            name:
              form.get('name'),

            email:
              form.get('email'),

            phone:
              form.get('phone') ||
              null,

            company:
              form.get('company') ||
              null,

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
      setError(
        requestError.response?.data
          ?.message ||
          'Unable to register right now.'
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
              Create your account
              <span>
                build something smarter.
              </span>
            </h1>

            <p className="auth-visual-copy">
              Join INGEVORA and access
              your engineering workspace.
              Our little panda will be here
              while you get started.
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
                activeField === 'confirmPassword'
                  ? showConfirmPassword
                  : showPassword
              }
              success={success}
              error={Boolean(error)}
            />

          </div>

          <div className="auth-visual-footer">
            <span>
              {lightOn
                ? 'Ready to get started'
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
              CREATE ACCOUNT
            </span>

            <h2>
              {t.auth.registerTitle ||
                'Register'}
            </h2>

            <p className="auth-card-description">
              Create your INGEVORA account
              to get started.
            </p>

          </div>

          <form
            className="auth-form register-form"
            onSubmit={handleSubmit}
          >

            {/* Name */}

            <div
              className={`auth-field ${
                activeField === 'name'
                  ? 'is-active'
                  : ''
              }`}
            >
              <label htmlFor="register-name">
                <UserRound size={15} />
                <span>
                  {t.auth.name}
                </span>
              </label>

              <input
                id="register-name"
                required
                name="name"
                autoComplete="name"
                onFocus={() =>
                  setActiveField(
                    'name'
                  )
                }
                onBlur={() =>
                  setActiveField('')
                }
              />
            </div>

            {/* Email */}

            <div
              className={`auth-field ${
                activeField === 'email'
                  ? 'is-active'
                  : ''
              }`}
            >
              <label htmlFor="register-email">
                <Mail size={15} />
                <span>
                  {t.auth.email}
                </span>
              </label>

              <input
                id="register-email"
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

            {/* Phone */}

            <div
              className={`auth-field ${
                activeField === 'phone'
                  ? 'is-active'
                  : ''
              }`}
            >
              <label htmlFor="register-phone">
                <Phone size={15} />
                <span>
                  {t.auth.phone}
                </span>
              </label>

              <input
                id="register-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                onFocus={() =>
                  setActiveField(
                    'phone'
                  )
                }
                onBlur={() =>
                  setActiveField('')
                }
              />
            </div>

            {/* Company */}

            <div
              className={`auth-field ${
                activeField === 'company'
                  ? 'is-active'
                  : ''
              }`}
            >
              <label htmlFor="register-company">
                <Building2 size={15} />
                <span>
                  {t.auth.company}
                </span>
              </label>

              <input
                id="register-company"
                name="company"
                autoComplete="organization"
                onFocus={() =>
                  setActiveField(
                    'company'
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
              <label htmlFor="register-password">
                <LockKeyhole size={15} />
                <span>
                  {t.auth.password}
                </span>
              </label>

              <div className="password-wrapper">

                <input
                  id="register-password"
                  required
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  name="password"
                  autoComplete="new-password"
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

            {/* Confirm Password */}

            <div
              className={`auth-field ${
                activeField ===
                'confirmPassword'
                  ? 'is-active'
                  : ''
              }`}
            >
              <label htmlFor="register-confirm">
                <LockKeyhole size={15} />
                <span>
                  {t.auth.confirmPassword}
                </span>
              </label>

              <div className="password-wrapper">

                <input
                  id="register-confirm"
                  required
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  name="confirmPassword"
                  autoComplete="new-password"
                  onFocus={() =>
                    setActiveField(
                      'confirmPassword'
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
                    setShowConfirmPassword(
                      (previous) =>
                        !previous
                    )
                  }
                >
                  {showConfirmPassword ? (
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
                  ? 'Account created'
                  : isSubmitting
                    ? 'Creating account...'
                    : t.auth
                        .createAccountButton}
              </span>

              <span className="auth-arrow">
                -&gt;
              </span>
            </button>

            {/* Login */}

            <div className="auth-bottom">
              <span>
                {t.auth.alreadyHaveAccount}
              </span>

              <Link to="/login">
                {t.auth.loginLink}
              </Link>
            </div>

          </form>

        </div>

      </section>
    </main>
  )
}
