import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../api/authApi'
import { setAuthToken } from '../api/client'

const AuthContext = createContext(null)
const STORAGE_KEY = 'festflow-auth'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || '')
  const [user, setUser] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(localStorage.getItem(STORAGE_KEY)))

  useEffect(() => {
    setAuthToken(token)

    if (!token) {
      setUser(null)
      setIsAuthLoading(false)
      return
    }

    const loadProfile = async () => {
      try {
        const response = await getCurrentUser()
        setUser(response.data)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
        setToken('')
        setUser(null)
      } finally {
        setIsAuthLoading(false)
      }
    }

    loadProfile()
  }, [token])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isAuthLoading,
      async login(credentials) {
        const response = await loginUser(credentials)
        localStorage.setItem(STORAGE_KEY, response.token)
        setToken(response.token)
        setUser(response.data)
        return response
      },
      async register(payload) {
        const response = await registerUser(payload)
        localStorage.setItem(STORAGE_KEY, response.token)
        setToken(response.token)
        setUser(response.data)
        return response
      },
      logout() {
        localStorage.removeItem(STORAGE_KEY)
        setToken('')
        setUser(null)
        setAuthToken('')
      },
    }),
    [token, user, isAuthLoading],
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
