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

/** Full-width, very faint energy waveform strip along the bottom edge. */
export function EnergyWave() {
  return (
    <svg className="power-line-waveform" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
      <path d={WAVE_PATH} stroke="#1597F5" strokeWidth="1" fill="none" />
      <circle r="2.4" fill="#16845b">
        <animateMotion dur="13s" repeatCount="indefinite" path={WAVE_PATH} />
      </circle>
    </svg>
  )
}