const NODES = [
  { x: 20, y: 30, r: 3 },
  { x: 72, y: 58, r: 2.4 },
  { x: 112, y: 24, r: 2 },
  { x: 54, y: 108, r: 2.6 },
  { x: 128, y: 88, r: 2 },
]

/** Organic curved connections (unlike the electrical right-angle traces). */
const CURVES = [
  'M20 30 Q46 20 72 58',
  'M72 58 Q95 30 112 24',
  'M72 58 Q55 90 54 108',
  'M54 108 Q95 130 128 88',
  'M112 24 Q140 60 128 88',
]

/**
 * A small "digital network" motif: drifting round nodes, curved data
 * connections and traveling packets. Meant to be placed in page corners;
 * mirror via CSS transforms (see .bg-corner variants) instead of duplicating
 * the markup.
 */
export function NetworkNodes({ className = '', color = '#087FE5' }) {
  return (
    <svg className={`network-nodes ${className}`.trim()} viewBox="0 0 160 160" aria-hidden="true">
      <g className="network-lines" stroke={color} strokeWidth="1" fill="none">
        {CURVES.map((d, i) => (
          <path key={d} d={d} style={{ animationDelay: `${i * 1.4}s` }} />
        ))}
      </g>
      <g className="network-node-group" fill={color}>
        {NODES.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} style={{ animationDelay: `${i * 0.6}s` }} />
        ))}
      </g>
      <circle className="network-pulse" r="2.2" fill={color}>
        <animateMotion dur="7s" repeatCount="indefinite" path={CURVES[0]} />
      </circle>
      <rect className="network-pulse network-pulse--packet" width="3" height="3" fill={color}>
        <animateMotion dur="9s" repeatCount="indefinite" begin="2s" path={CURVES[3]} />
      </rect>
    </svg>
  )
}
