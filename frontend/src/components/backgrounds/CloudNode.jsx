/** Minimal cloud silhouette representing cloud solutions, floating slowly. */
export function CloudNode({ className = '', color = '#1597F5' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="98" height="66" viewBox="0 0 98 66" aria-hidden="true">
      <g className="float-y-slow">
        <path
          d="M26 44 C14 44 6 36 6 27 C6 18 14 12 22 13 C24 5 33 0 42 2 C50 4 55 11 55 18 C64 15 74 21 75 30 C84 30 91 36 91 44 C91 52 84 58 76 58 H26 C18 58 12 52 12 44 Z"
          fill="rgba(255,255,255,0.55)"
          stroke={color}
          strokeWidth="1.2"
          opacity="0.4"
        />
        <line x1="30" y1="46" x2="70" y2="46" stroke="var(--navy)" strokeWidth="1" opacity="0.22" />
        <line x1="34" y1="52" x2="60" y2="52" stroke="var(--navy)" strokeWidth="1" opacity="0.18" />
      </g>
    </svg>
  )
}