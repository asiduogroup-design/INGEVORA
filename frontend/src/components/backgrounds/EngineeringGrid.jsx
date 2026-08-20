/**
 * Very faint animated grid, tinted per page via `color`.
 * variant "dots" -> soft digital dot-matrix (software).
 * variant "blueprint" -> layered engineering drafting grid (electrical).
 */
export function EngineeringGrid({ color = 'rgba(8, 127, 229, 0.05)', variant = 'dots', className = '' }) {
  const style =
    variant === 'blueprint'
      ? {
          backgroundImage: [
            `linear-gradient(${color} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${color} 1px, transparent 1px)`,
            `linear-gradient(${color} 1px, transparent 1px)`,
            `linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          ].join(', '),
          backgroundSize: '96px 96px, 96px 96px, 24px 24px, 24px 24px',
        }
      : {
          backgroundImage: `radial-gradient(${color} 1px, transparent 1.4px)`,
          backgroundSize: '30px 30px',
        }

  return (
    <div
      className={`engineering-grid engineering-grid--${variant} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    />
  )
}
