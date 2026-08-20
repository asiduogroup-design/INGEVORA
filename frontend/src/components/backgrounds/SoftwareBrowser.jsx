/** Generic browser window with an abstract website layout. */
export function SoftwareBrowser({ className = '' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="140" height="100" viewBox="0 0 140 100" aria-hidden="true">
      <g className="float-x">
        <rect x="4" y="4" width="132" height="92" rx="10" fill="rgba(255,255,255,0.55)" stroke="var(--blue)" strokeWidth="1.2" opacity="0.45" />
        <rect x="4" y="4" width="132" height="18" rx="10" fill="var(--light-blue)" opacity="0.4" />
        <circle cx="16" cy="13" r="2.4" fill="var(--blue)" opacity="0.4" />
        <circle cx="26" cy="13" r="2.4" fill="var(--electric-blue)" opacity="0.35" />
        <circle cx="36" cy="13" r="2.4" fill="var(--green)" opacity="0.3" />
        <rect x="16" y="32" width="108" height="10" rx="3" fill="var(--light-blue)" opacity="0.35" />
        <rect x="16" y="50" width="50" height="34" rx="3" fill="var(--light-blue)" opacity="0.28" />
        <rect x="74" y="50" width="50" height="34" rx="3" fill="var(--light-blue)" opacity="0.28" />
      </g>
    </svg>
  )
}