import { branding } from '../../config/branding'
import { useLanguage } from '../../hooks/useLanguage'

export function LanguageLogo({ className = 'language-logo' }) {
  const { language } = useLanguage()
  const src = language === 'it' ? branding.logos.italian : branding.logos.english
  return <img className={className} src={src} alt="INGEVORA" />
}
