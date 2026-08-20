/** Generic smartphone silhouette with a few abstract app UI blocks. */
export function SoftwareMobile({ className = '' }) {
  return (
    <svg className={`bg-object ${className}`.trim()} width="62" height="114" viewBox="0 0 62 114" aria-hidden="true">
      <g className="float-y">
        <rect x="4" y="4" width="54" height="106" rx="10" fill="rgba(255,255,255,0.55)" stroke="var(--blue)" strokeWidth="1.2" opacity="0.45" />
        <rect x="22" y="9" width="18" height="3" rx="1.5" fill="var(--navy)" opacity="0.3" />
        <rect x="12" y="24" width="38" height="8" rx="2" fill="var(--light-blue)" opacity="0.35" />
        <rect x="12" y="38" width="38" height="20" rx="3" fill="var(--light-blue)" opacity="0.28" />
        <rect x="12" y="64" width="17" height="17" rx="3" fill="var(--light-blue)" opacity="0.3" />
        <rect x="33" y="64" width="17" height="17" rx="3" fill="var(--light-blue)" opacity="0.3" />
      </g>
    </svg>
  )
}