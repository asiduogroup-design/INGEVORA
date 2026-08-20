/** Minimal wireless mouse silhouette, slowly rotating. */
export function SoftwareMouse({ className = '' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="52" height="82" viewBox="0 0 52 82" aria-hidden="true">
      <g className="rotate-slow">
        <path
          d="M26 4 C42 4 48 20 48 40 C48 60 42 78 26 78 C10 78 4 60 4 40 C4 20 10 4 26 4 Z"
          fill="rgba(255,255,255,0.55)"
          stroke="var(--blue)"
          strokeWidth="1.2"
          opacity="0.45"
        />
        <line x1="26" y1="10" x2="26" y2="30" stroke="var(--navy)" strokeWidth="1.2" opacity="0.3" />
      </g>
    </svg>
  )
}