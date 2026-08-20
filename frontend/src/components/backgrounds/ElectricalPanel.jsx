/** Electrical distribution panel with softly blinking indicator lights. */
export function ElectricalPanel({ className = '', color = '#1597F5' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="70" height="102" viewBox="0 0 70 102" aria-hidden="true">
      <g className="float-y-slow">
        <rect x="6" y="6" width="58" height="90" rx="6" fill="rgba(255,255,255,0.55)" stroke={color} strokeWidth="1.2" opacity="0.42" />
        <line x1="35" y1="18" x2="35" y2="84" stroke="var(--navy)" strokeWidth="1" opacity="0.16" />
        <circle cx="20" cy="26" r="3" fill="var(--green)" className="indicator-blink" opacity="0.4" />
        <circle cx="20" cy="42" r="3" fill={color} className="indicator-blink" style={{ animationDelay: '1.2s' }} opacity="0.4" />
        <circle cx="20" cy="58" r="3" fill="var(--red)" className="indicator-blink" style={{ animationDelay: '2.4s' }} opacity="0.32" />
        <rect x="44" y="20" width="12" height="60" rx="2" fill="var(--light-blue)" opacity="0.28" />
      </g>
    </svg>
  )
}