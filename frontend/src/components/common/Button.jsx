import { Link } from 'react-router-dom'

export function Button({ children, to, variant = 'primary', ...props }) {
  const className = `btn btn-${variant}`
  if (to) {
    return (
      <Link className={className} to={to} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <button className={className} type="button" {...props}>
      {children}
    </button>
  )
}
