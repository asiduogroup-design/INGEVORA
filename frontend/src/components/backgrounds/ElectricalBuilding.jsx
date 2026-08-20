const ROWS = [0, 1, 2, 3]
const COLS = [0, 1, 2]

/** Modern commercial building silhouette with a subtle window grid. */
export function ElectricalBuilding({ className = '', color = '#0B5CAD' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="86" height="126" viewBox="0 0 86 126" aria-hidden="true">
      <g className="float-y">
        <rect x="8" y="8" width="70" height="110" rx="3" fill="rgba(255,255,255,0.5)" stroke={color} strokeWidth="1.2" opacity="0.4" />
        {ROWS.map((row) =>
          COLS.map((col) => (
            <rect
              key={`${row}-${col}`}
              x={18 + col * 18}
              y={18 + row * 24}
              width="10"
              height="14"
              fill="var(--light-blue)"
              opacity="0.32"
            />
          )),
        )}
        <line x1="43" y1="118" x2="43" y2="8" stroke="var(--electric-blue)" strokeWidth="1" opacity="0.16" className="pulse-soft" />
      </g>
    </svg>
  )
}