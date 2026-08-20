import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ingevora_user')
    return stored ? JSON.parse(stored) : null
  })

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (payload) => {
        const nextUser = { name: payload.name || 'INGEVORA User', email: payload.email }
        localStorage.setItem('ingevora_user', JSON.stringify(nextUser))
        setUser(nextUser)
      },
      logout: () => {
        localStorage.removeItem('ingevora_user')
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
