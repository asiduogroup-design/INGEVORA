import { EngineeringGrid } from './EngineeringGrid'
import { NetworkNodes } from './NetworkNodes'
import './backgrounds.css'

/** "Digital Network Motion" — subtle blue network lines for the Software page. */
export function SoftwareBackground() {
  return (
    <div className="page-background software-background" aria-hidden="true">
      <EngineeringGrid color="rgba(8, 127, 229, 0.06)" variant="dots" />
      <div className="bg-radial" style={{
        background:
          'radial-gradient(circle at 12% 18%, rgba(8, 127, 229, 0.05), transparent 42%),' +
          'radial-gradient(circle at 88% 82%, rgba(11, 92, 173, 0.05), transparent 45%)',
      }} />
      <svg className="data-flow-line" viewBox="0 0 1000 40" preserveAspectRatio="none">
        <line x1="0" y1="20" x2="1000" y2="20" stroke="#1597F5" strokeWidth="1" />
        <circle r="2.4" fill="#1597F5">
          <animateMotion dur="12s" repeatCount="indefinite" path="M0 20 L1000 20" />
        </circle>
        <circle r="1.8" fill="#087FE5">
          <animateMotion dur="16s" repeatCount="indefinite" begin="4s" path="M0 20 L1000 20" />
        </circle>
      </svg>
      <NetworkNodes className="bg-corner bg-corner--top-left" />
      <NetworkNodes className="bg-corner bg-corner--top-right" />
      <NetworkNodes className="bg-corner bg-corner--bottom-left hide-tablet-down" />
      <NetworkNodes className="bg-corner bg-corner--bottom-right hide-mobile" />
    </div>
  )
}

