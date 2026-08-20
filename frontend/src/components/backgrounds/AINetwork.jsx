const NODES = [
  { x: 44, y: 12 },
  { x: 14, y: 40 },
  { x: 74, y: 42 },
  { x: 44, y: 70 },
]

const LINES = [
  'M44 12 L14 40',
  'M44 12 L74 42',
  'M14 40 L44 70',
  'M74 42 L44 70',
]

/** A small AI / intelligent-systems node cluster with a gentle pulse. */
export function AINetwork({ className = '', color = '#087FE5' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="88" height="82" viewBox="0 0 88 82" aria-hidden="true">
      <g>
        {LINES.map((d) => (
          <path key={d} d={d} stroke={color} strokeWidth="1" fill="none" opacity="0.14" />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={`${n.x}-${n.y}`}
            cx={n.x}
            cy={n.y}
            r={i === 0 ? 4 : 3}
            fill={color}
            className="pulse-soft"
            style={{ animationDelay: `${i * 0.7}s` }}
            opacity="0.3"
          />
        ))}
      </g>
    </svg>
  )
}