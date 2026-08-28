import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ingevora_user')
    try {
      const parsed = stored ? JSON.parse(stored) : null
      return parsed?.token ? parsed : null
    } catch {
      localStorage.removeItem('ingevora_user')
      return null
    }
  })
  const [isLoading, setIsLoading] = useState(() => user !== null && !user?.isStaticTestUser)

  useEffect(() => {
    const token = user?.token
    if (!token) {
      return
    }
    if (user?.isStaticTestUser) {
      return
    }

    api.get('/auth/me')
      .then((response) => {
        const currentUser = response.data?.data
        if (!currentUser?.id) {
          throw new Error('Invalid user response')
        }
        const authenticatedUser = { ...currentUser, token }
        localStorage.setItem('ingevora_user', JSON.stringify(authenticatedUser))
        setUser(authenticatedUser)
      })
      .catch(() => {
        localStorage.removeItem('ingevora_user')
        setUser(null)
      })
      .finally(() => setIsLoading(false))
  }, [user?.isStaticTestUser, user?.token])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login: (payload) => {
        const nextUser = {
          id: payload.id,
          name: payload.name || 'INGEVORA User',
          email: payload.email,
          role: payload.role || 'user',
          token: payload.token,
          isStaticTestUser: payload.isStaticTestUser || false,
        }
        localStorage.setItem('ingevora_user', JSON.stringify(nextUser))
        setUser(nextUser)
      },
      logout: async () => {
        try {
          if (user?.token) {
            await api.post('/auth/logout')
          }
        } finally {
          localStorage.removeItem('ingevora_user')
          setUser(null)
        }
      },
    }),
    [isLoading, user],
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
