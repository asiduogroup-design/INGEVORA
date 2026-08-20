import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IngevoraLogo } from '../branding/IngevoraLogo'
import { useLanguage } from '../../hooks/useLanguage'
import { useAuth } from '../../hooks/useAuth'

const links = [
  ['/', 'home'],
  ['/software', 'software'],
  ['/electrical', 'electrical'],
  ['/about', 'about'],
  ['/ai-updates', 'ai'],
  ['/pricing', 'pricing'],
  ['/contact', 'contact'],
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, toggleLanguage } = useLanguage()
  const { isAuthenticated, logout } = useAuth()
  const nav = t.common.nav

  return (
    <header className="site-header">
      <NavLink className="brand-link" to="/" aria-label="INGEVORA home">
        <IngevoraLogo />
      </NavLink>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([to, key]) => (
          <NavLink key={to} to={to}>
            {nav[key]}
          </NavLink>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="language-button" type="button" onClick={toggleLanguage}>
          {nav.language}
        </button>
        {isAuthenticated ? (
          <>
            <NavLink className="login-link" to="/profile">{nav.profile}</NavLink>
            <button className="language-button" type="button" onClick={logout}>Logout</button>
          </>
        ) : (
          <NavLink className="login-link" to="/login">{nav.login}</NavLink>
        )}
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {links.map(([to, key]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {nav[key]}
            </NavLink>
          ))}
          <button type="button" onClick={toggleLanguage}>
            {nav.language}
          </button>
          {isAuthenticated ? (
            <button type="button" onClick={() => { logout(); setOpen(false) }}>Logout</button>
          ) : (
            <NavLink to="/login" onClick={() => setOpen(false)}>{nav.login}</NavLink>
          )}
        </div>
      )}
    </header>
  )
}
