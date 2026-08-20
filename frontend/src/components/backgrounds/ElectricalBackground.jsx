import { EngineeringGrid } from './EngineeringGrid'
import { CircuitLines } from './CircuitLines'
import './backgrounds.css'

/** Builds a gentle sine-like path used for the bottom power waveform strip. */
function buildWavePath(width, amplitude, wavelength, y) {
  let d = `M0 ${y}`
  let sign = 1
  for (let x = 0; x < width; x += wavelength) {
    d += ` Q${x + wavelength / 2} ${y - amplitude * sign} ${x + wavelength} ${y}`
    sign *= -1
  }
  return d
}

const WAVE_PATH = buildWavePath(1000, 10, 60, 30)

/** "Energy Flow Motion" — subtle circuit paths and pulses for the Electrical page. */
export function ElectricalBackground() {
  return (
    <div className="page-background electrical-background" aria-hidden="true">
      <EngineeringGrid color="rgba(11, 92, 173, 0.05)" variant="blueprint" />
      <div className="bg-radial" style={{
        background:
          'radial-gradient(circle at 10% 15%, rgba(21, 151, 245, 0.05), transparent 42%),' +
          'radial-gradient(circle at 90% 85%, rgba(22, 132, 91, 0.05), transparent 45%)',
      }} />
      <svg className="power-line-waveform" viewBox="0 0 1000 60" preserveAspectRatio="none">
        <path d={WAVE_PATH} stroke="#1597F5" strokeWidth="1" fill="none" />
        <circle r="2.4" fill="#16845b">
          <animateMotion dur="13s" repeatCount="indefinite" path={WAVE_PATH} />
        </circle>
      </svg>
      <CircuitLines className="bg-corner bg-corner--top-left" />
      <CircuitLines className="bg-corner bg-corner--top-right" />
      <CircuitLines className="bg-corner bg-corner--bottom-left hide-tablet-down" />
      <CircuitLines className="bg-corner bg-corner--bottom-right hide-mobile" />
    </div>
  )
}

