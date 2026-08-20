/** Modern EV charger with a cable path and a traveling energy pulse. */
export function EVCharger({ className = '', color = '#1597F5' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="64" height="118" viewBox="0 0 64 118" aria-hidden="true">
      <g className="float-y-slow">
        <rect x="8" y="6" width="34" height="66" rx="6" fill="rgba(255,255,255,0.55)" stroke={color} strokeWidth="1.2" opacity="0.42" />
        <rect x="15" y="14" width="20" height="14" rx="2" fill="var(--light-blue)" opacity="0.35" />
        <circle cx="25" cy="48" r="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
        <path d="M25 54 C25 78 4 84 6 108" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
        <circle r="2" fill="var(--green)" opacity="0.45">
          <animateMotion dur="5s" repeatCount="indefinite" path="M25 54 C25 78 4 84 6 108" />
        </circle>
      </g>
    </svg>
  )
}