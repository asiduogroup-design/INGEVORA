/** Minimal architectural pendant light with a soft glow pulse. */
export function LightingElement({ className = '', color = '#1597F5' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="58" height="94" viewBox="0 0 58 94" aria-hidden="true">
      <g className="float-y">
        <line x1="29" y1="2" x2="29" y2="46" stroke={color} strokeWidth="1.2" opacity="0.3" />
        <path d="M14 46 H44 L38 62 H20 Z" fill="rgba(255,255,255,0.5)" stroke={color} strokeWidth="1.1" opacity="0.4" />
        <circle cx="29" cy="70" r="16" fill="var(--electric-blue)" opacity="0.14" className="glow-pulse" />
      </g>
    </svg>
  )
}