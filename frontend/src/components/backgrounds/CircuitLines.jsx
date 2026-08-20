const PATH = 'M4 60 H40 V20 H90 V44 H126'
const NODES = [
  { x: 40, y: 60 },
  { x: 90, y: 20 },
  { x: 126, y: 44 },
]

/**
 * A compact right-angle circuit connector with junction nodes and a
 * traveling energy pulse — used once as a quiet accent linking two
 * electrical objects, not as the page's main visual.
 */
export function CircuitLines({ className = '', color = '#1597F5' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="130" height="80" viewBox="0 0 130 80" aria-hidden="true">
      <g>
        <path d={PATH} stroke={color} strokeWidth="1" fill="none" opacity="0.14" />
        {NODES.map((n) => (
          <circle key={`${n.x}-${n.y}`} cx={n.x} cy={n.y} r="2" fill={color} opacity="0.22" />
        ))}
        <circle r="1.8" fill={color} className="pulse-soft">
          <animateMotion dur="7s" repeatCount="indefinite" path={PATH} />
        </circle>
      </g>
    </svg>
  )
}
