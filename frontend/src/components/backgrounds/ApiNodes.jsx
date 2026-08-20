/** Two API/integration nodes with a small data particle traveling between them. */
export function ApiNodes({ className = '', color = '#087FE5' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="94" height="40" viewBox="0 0 94 40" aria-hidden="true">
      <g>
        <line x1="10" y1="20" x2="84" y2="20" stroke={color} strokeWidth="1" opacity="0.16" />
        <circle cx="10" cy="20" r="4" fill={color} opacity="0.28" />
        <circle cx="84" cy="20" r="4" fill={color} opacity="0.28" />
        <circle r="2" fill={color} opacity="0.4">
          <animateMotion dur="4.5s" repeatCount="indefinite" path="M10 20 L84 20" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
        </circle>
      </g>
    </svg>
  )
}