/** Elegant floating search bar with a magnifier and blinking cursor. */
export function SoftwareSearchBar({ className = '' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="164" height="42" viewBox="0 0 164 42" aria-hidden="true">
      <g className="float-y-slow">
        <rect x="2" y="2" width="160" height="38" rx="19" fill="rgba(255,255,255,0.55)" stroke="var(--blue)" strokeWidth="1.2" opacity="0.45" />
        <circle cx="26" cy="21" r="6" fill="none" stroke="var(--navy)" strokeWidth="1.4" opacity="0.35" />
        <line x1="30.5" y1="25.5" x2="35" y2="30" stroke="var(--navy)" strokeWidth="1.4" opacity="0.35" />
        <rect x="48" y="18" width="70" height="6" rx="3" fill="var(--light-blue)" opacity="0.35" />
        <line x1="126" y1="14" x2="126" y2="28" stroke="var(--blue)" strokeWidth="1.6" className="cursor-blink" opacity="0.5" />
      </g>
    </svg>
  )
}