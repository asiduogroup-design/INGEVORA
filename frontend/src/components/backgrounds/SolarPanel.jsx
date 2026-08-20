const CELL_COLS = [0, 1, 2, 3]

/** Elegant solar panel with a subtle rising energy glow. */
export function SolarPanel({ className = '', color = '#0B5CAD' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="128" height="76" viewBox="0 0 128 76" aria-hidden="true">
      <g className="float-x">
        <rect x="8" y="24" width="112" height="40" rx="3" fill="rgba(255,255,255,0.5)" stroke={color} strokeWidth="1.2" opacity="0.4" transform="skewX(-8)" />
        {CELL_COLS.map((col) => (
          <line
            key={col}
            x1={26 + col * 24}
            y1="24"
            x2={22 + col * 24}
            y2="64"
            stroke={color}
            strokeWidth="1"
            opacity="0.18"
          />
        ))}
        <rect x="8" y="24" width="112" height="1.2" fill="var(--electric-blue)" opacity="0.3" className="glow-pulse" transform="skewX(-8)" />
      </g>
    </svg>
  )
}