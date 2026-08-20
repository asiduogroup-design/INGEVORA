/** Minimal residential house outline with a subtle internal power path. */
export function ElectricalHouse({ className = '', color = '#1597F5' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="112" height="92" viewBox="0 0 112 92" aria-hidden="true">
      <g className="float-y-slow">
        <path d="M6 44 L56 8 L106 44" fill="none" stroke={color} strokeWidth="1.4" opacity="0.4" />
        <rect x="18" y="44" width="76" height="42" fill="rgba(255,255,255,0.5)" stroke={color} strokeWidth="1.2" opacity="0.4" />
        <rect x="50" y="60" width="12" height="26" fill="var(--light-blue)" opacity="0.35" />
        <path d="M56 14 V44 M40 44 V60 M72 44 V60" stroke="var(--electric-blue)" strokeWidth="1" opacity="0.22" className="pulse-soft" />
      </g>
    </svg>
  )
}