import { EngineeringGrid } from '../backgrounds/EngineeringGrid'
import { AINetwork } from '../backgrounds/AINetwork'
import { CircuitLines } from '../backgrounds/CircuitLines'
import { ApiNodes } from '../backgrounds/ApiNodes'
import '../backgrounds/backgrounds.css'
import './AuthMotionBackground.css'

export function AuthMotionBackground({ lightOn = true }) {
  return (
    <div
      className={`auth-motion-bg ${lightOn ? 'is-day' : 'is-night'}`}
      aria-hidden="true"
    >
      {/* Animated digital grid with gentle drift */}
      <EngineeringGrid
        color={lightOn ? 'rgba(8, 127, 229, 0.07)' : 'rgba(191, 230, 255, 0.04)'}
        variant="dots"
        className="auth-bg-grid"
      />

      {/* Floating luminous aurora orbs */}
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />
      <div className="auth-orb auth-orb-3" />

      {/* Ambient floating engineering motion objects around the edges */}
      <div className="auth-bg-objects">
        <div className="auth-bg-obj obj-tl">
          <AINetwork color={lightOn ? '#087fe5' : '#8ed4ff'} />
        </div>

        <div className="auth-bg-obj obj-tr">
          <CircuitLines color={lightOn ? '#1597f5' : '#a3dbff'} />
        </div>

        <div className="auth-bg-obj obj-bl">
          <ApiNodes color={lightOn ? '#087fe5' : '#8ed4ff'} />
        </div>

        <div className="auth-bg-obj obj-br">
          <svg
            className="bg-object rotate-slow"
            width="80"
            height="80"
            viewBox="0 0 80 80"
          >
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke={lightOn ? '#087fe5' : '#8ed4ff'}
              strokeWidth="1"
              strokeDasharray="5 4"
              opacity="0.2"
            />
            <circle
              cx="40"
              cy="40"
              r="22"
              fill="none"
              stroke={lightOn ? '#16845b' : '#31e97d'}
              strokeWidth="1"
              opacity="0.16"
            />
            <circle
              cx="40"
              cy="6"
              r="3"
              fill={lightOn ? '#087fe5' : '#8ed4ff'}
              opacity="0.4"
              className="pulse-soft"
            />
          </svg>
        </div>
      </div>

      {/* Floating ambient tech sparks / constellation stars */}
      <div className="auth-particles">
        <span className="particle p1" />
        <span className="particle p2" />
        <span className="particle p3" />
        <span className="particle p4" />
        <span className="particle p5" />
        <span className="particle p6" />
        <span className="particle p7" />
        <span className="particle p8" />
      </div>

      {/* Subtle sweeping engineering scan line */}
      <div className="auth-scan-line" />
    </div>
  )
}
