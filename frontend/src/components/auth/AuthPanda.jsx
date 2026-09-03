import { useEffect, useMemo, useState } from 'react'

export function AuthPanda({
  lightOn = true,
  activeField = '',
  showPassword = false,
  success = false,
  error = false,
}) {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    function handlePointerMove(event) {
      const x =
        event.clientX / window.innerWidth - 0.5
      const y =
        event.clientY / window.innerHeight - 0.5

      setCursor({
        x: Math.max(-0.5, Math.min(0.5, x)),
        y: Math.max(-0.5, Math.min(0.5, y)),
      })
    }

    window.addEventListener(
      'pointermove',
      handlePointerMove
    )

    return () => {
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      )
    }
  }, [])

  const isPassword =
    activeField === 'password' ||
    activeField === 'confirmPassword'

  const isWatching =
    ['name', 'email', 'phone', 'company'].includes(
      activeField
    )

  const mood = useMemo(() => {
    if (!lightOn) {
      return 'sleep'
    }

    if (success) {
      return 'success'
    }

    if (isPassword && !showPassword) {
      return 'cover'
    }

    if (isWatching) {
      return 'watch'
    }

    return 'awake'
  }, [
    lightOn,
    success,
    isPassword,
    showPassword,
    isWatching,
  ])

  const eyeX =
    mood === 'watch'
      ? cursor.x * 12
      : cursor.x * 6

  const eyeY =
    mood === 'watch'
      ? cursor.y * 8
      : cursor.y * 4

  const headX =
    lightOn ? cursor.x * 7 : 0
  const headY =
    lightOn ? cursor.y * 4 : 8
  const rotate =
    lightOn ? cursor.x * 5 : -3

  return (
    <div
      className={[
        'auth-panda',
        `auth-panda--${mood}`,
        error ? 'auth-panda--error' : '',
      ].join(' ')}
      style={{
        '--panda-head-x': `${headX}px`,
        '--panda-head-y': `${headY}px`,
        '--panda-rotate': `${rotate}deg`,
        '--panda-eye-x': `${eyeX}px`,
        '--panda-eye-y': `${eyeY}px`,
      }}
      aria-hidden="true"
    >
      <svg
        className="auth-panda-svg"
        viewBox="0 0 320 340"
        role="img"
      >
        <defs>
          <linearGradient
            id="panda-fur"
            x1="160"
            y1="72"
            x2="160"
            y2="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#eaf1f8" />
          </linearGradient>
          <linearGradient
            id="panda-belly"
            x1="160"
            y1="220"
            x2="160"
            y2="308"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#edf5fb" />
          </linearGradient>
          <filter
            id="panda-shadow"
            x="25"
            y="24"
            width="270"
            height="304"
            filterUnits="userSpaceOnUse"
          >
            <feDropShadow
              dx="0"
              dy="20"
              stdDeviation="14"
              floodColor="#00122b"
              floodOpacity="0.2"
            />
          </filter>
        </defs>

        <ellipse
          className="panda-ground"
          cx="160"
          cy="316"
          rx="86"
          ry="16"
        />

        <g
          className="panda-body"
          filter="url(#panda-shadow)"
        >
          <ellipse
            cx="160"
            cy="247"
            rx="78"
            ry="70"
            fill="url(#panda-fur)"
          />
          <ellipse
            cx="160"
            cy="263"
            rx="43"
            ry="47"
            fill="url(#panda-belly)"
          />
          <path
            className="panda-arm panda-arm-left"
            d="M88 226C66 238 64 273 79 289C89 300 102 294 105 280L109 242C109 230 99 221 88 226Z"
          />
          <path
            className="panda-arm panda-arm-right"
            d="M232 226C254 238 256 273 241 289C231 300 218 294 215 280L211 242C211 230 221 221 232 226Z"
          />
        </g>

        <g
          className="panda-head"
          filter="url(#panda-shadow)"
        >
          <circle
            className="panda-ear panda-ear-left"
            cx="89"
            cy="86"
            r="39"
          />
          <circle
            className="panda-ear panda-ear-right"
            cx="231"
            cy="86"
            r="39"
          />
          <ellipse
            cx="160"
            cy="146"
            rx="100"
            ry="90"
            fill="url(#panda-fur)"
          />
          <ellipse
            cx="112"
            cy="144"
            rx="35"
            ry="48"
            transform="rotate(27 112 144)"
            fill="#121927"
          />
          <ellipse
            cx="208"
            cy="144"
            rx="35"
            ry="48"
            transform="rotate(-27 208 144)"
            fill="#121927"
          />

          <g className="panda-eye panda-eye-left">
            <ellipse
              cx="116"
              cy="145"
              rx="13"
              ry="16"
              fill="#ffffff"
            />
            <circle
              className="panda-pupil"
              cx="119"
              cy="147"
              r="8"
            />
            <circle
              className="panda-highlight"
              cx="122"
              cy="143"
              r="2.5"
            />
          </g>

          <g className="panda-eye panda-eye-right">
            <ellipse
              cx="204"
              cy="145"
              rx="13"
              ry="16"
              fill="#ffffff"
            />
            <circle
              className="panda-pupil"
              cx="201"
              cy="147"
              r="8"
            />
            <circle
              className="panda-highlight"
              cx="204"
              cy="143"
              r="2.5"
            />
          </g>

          <path
            className="panda-sleep-eye panda-sleep-eye-left"
            d="M105 150C113 141 124 141 132 150"
          />
          <path
            className="panda-sleep-eye panda-sleep-eye-right"
            d="M188 150C196 141 207 141 215 150"
          />

          <ellipse
            className="panda-nose"
            cx="160"
            cy="177"
            rx="13"
            ry="10"
          />
          <path
            className="panda-mouth"
            d="M160 186C155 194 148 195 143 191"
          />
          <path
            className="panda-mouth"
            d="M160 186C165 194 172 195 177 191"
          />
          <ellipse
            className="panda-cheek panda-cheek-left"
            cx="104"
            cy="181"
            rx="14"
            ry="7"
          />
          <ellipse
            className="panda-cheek panda-cheek-right"
            cx="216"
            cy="181"
            rx="14"
            ry="7"
          />
        </g>

        <g className="panda-cover-paws">
          <ellipse
            className="panda-cover-paw-left"
            cx="111"
            cy="149"
            rx="28"
            ry="35"
          />
          <ellipse
            className="panda-cover-paw-right"
            cx="209"
            cy="149"
            rx="28"
            ry="35"
          />
        </g>
      </svg>

      {!lightOn && (
        <div className="panda-zzz">
          <span>Z</span>
          <span>z</span>
          <span>z</span>
        </div>
      )}

      {success && (
        <div className="panda-hearts">
          <span>*</span>
          <span>*</span>
          <span>*</span>
        </div>
      )}
    </div>
  )
}
