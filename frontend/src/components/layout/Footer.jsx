import { Link } from 'react-router-dom'
import { LogoMark } from '../branding/LogoMark'
import { useLanguage } from '../../hooks/useLanguage'

export function Footer() {
  const { t, toggleLanguage } = useLanguage()
  const nav = t.common.nav

  return (
    <footer className="site-footer">
      <div>
        <LogoMark />
        <p>{t.common.footer}</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/software">{nav.software}</Link>
        <Link to="/electrical">{nav.electrical}</Link>
        <Link to="/ai-updates">{nav.ai}</Link>
        <Link to="/pricing">{nav.pricing}</Link>
        <Link to="/contact">{nav.contact}</Link>
        <button type="button" onClick={toggleLanguage}>
          {nav.language}
        </button>
      </nav>
    </footer>
  )
}
