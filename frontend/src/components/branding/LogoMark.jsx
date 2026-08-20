import { branding } from '../../config/branding'

export function LogoMark({ className = 'logo-mark' }) {
  return <img className={className} src={branding.logos.mark} alt="INGEVORA emblem" />
}
