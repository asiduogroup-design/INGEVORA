const PATHS = [
  'M10 20 H70 V60 H130',
  'M20 92 H90 V42 H150',
  'M0 132 H50 V102 H120 V152',
]

const NODES = [
  { x: 70, y: 20 },
  { x: 70, y: 60 },
  { x: 90, y: 92 },
  { x: 150, y: 42 },
  { x: 50, y: 132 },
  { x: 120, y: 152 },
]

/** Faint waveform strip suggesting energy flow along the bottom of the motif. */
const WAVEFORM = 'M0 145 Q10 135 20 145 T40 145 T60 145 T80 145'

/**
 * "Energy flow" motif: right-angle circuit traces, small junction nodes and a
 * traveling pulse. Mirrored via CSS (.bg-corner variants) to avoid duplication.
 */
export function CircuitLines({ className = '', color = '#1597F5' }) {
  return (
    <svg className={`circuit-lines ${className}`.trim()} viewBox="0 0 160 160" aria-hidden="true">
      <g className="circuit-paths" stroke={color} strokeWidth="1" fill="none">
        {PATHS.map((d, i) => (
          <path key={d} d={d} style={{ animationDelay: `${i * 1.6}s` }} />
        ))}
      </g>
      <g className="circuit-waveform" stroke={color} strokeWidth="1" fill="none">
        <path d={WAVEFORM} />
      </g>
      {/* capacitor-style junction glyph, unique to the electrical motif */}
      <g className="circuit-component" stroke={color} strokeWidth="1.1">
        <line x1="86" y1="86" x2="86" y2="98" />
        <line x1="94" y1="86" x2="94" y2="98" />
      </g>
      <g className="circuit-node-group" fill={color} style={{ color }}>
        {NODES.map((n, i) => (
          <rect
            key={`${n.x}-${n.y}`}
            x={n.x - 1.5}
            y={n.y - 1.5}
            width="3"
            height="3"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </g>
      <circle className="circuit-pulse" r="2" fill={color}>
        <animateMotion dur="6s" repeatCount="indefinite" path={PATHS[0]} />
      </circle>
      <circle className="circuit-pulse" r="1.6" fill={color}>
        <animateMotion dur="8s" repeatCount="indefinite" begin="2s" path={PATHS[2]} />
      </circle>
    </svg>
  )
}
