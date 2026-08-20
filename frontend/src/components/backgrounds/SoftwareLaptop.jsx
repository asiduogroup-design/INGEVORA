/** Minimal unbranded laptop with an abstract dashboard on screen. */
export function SoftwareLaptop({ className = '' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="128" height="92" viewBox="0 0 128 92" aria-hidden="true">
      <g className="float-y-slow">
        <rect x="10" y="8" width="108" height="66" rx="6" fill="rgba(255,255,255,0.55)" stroke="var(--blue)" strokeWidth="1.2" opacity="0.5" />
        <rect x="18" y="16" width="46" height="4" rx="2" fill="var(--electric-blue)" opacity="0.35" />
        <rect x="18" y="26" width="30" height="4" rx="2" fill="var(--blue)" opacity="0.28" />
        <rect x="70" y="16" width="38" height="34" rx="3" fill="var(--light-blue)" opacity="0.4" />
        <rect x="18" y="44" width="46" height="20" rx="3" fill="var(--light-blue)" opacity="0.3" />
        <path d="M2 78 H126 L114 88 H14 Z" fill="rgba(255,255,255,0.5)" stroke="var(--navy)" strokeWidth="1" opacity="0.35" />
      </g>
    </svg>
  )
}