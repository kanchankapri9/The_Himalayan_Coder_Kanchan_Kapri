import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../api/authApi'
import { setAuthToken } from '../api/client'

const AuthContext = createContext(null)
const STORAGE_KEY = 'festflow-auth'

function readStoredSession() {
  const rawValue = localStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return { token: '', user: null }
  }

  try {
    const parsedValue = JSON.parse(rawValue)
    return {
      token: parsedValue.token || '',
      user: parsedValue.user || null,
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return { token: '', user: null }
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => readStoredSession())
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(readStoredSession().token))

  useEffect(() => {
    if (session.token) {
      setAuthToken(session.token)
    } else {
      setAuthToken('')
    }
  }, [session.token])

  useEffect(() => {
    if (!session.token) {
      setIsAuthLoading(false)
      return
    }

    let ignore = false

    const loadCurrentUser = async () => {
      try {
        setIsAuthLoading(true)
        const response = await getCurrentUser()

        if (!ignore) {
          const nextSession = {
            token: session.token,
            user: response.data || response.user || session.user,
          }
          setSession(nextSession)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
        }
      } catch {
        if (!ignore) {
          setSession({ token: '', user: null })
          localStorage.removeItem(STORAGE_KEY)
          setAuthToken('')
        }
      } finally {
        if (!ignore) {
          setIsAuthLoading(false)
        }
      }
    }

    loadCurrentUser()

    return () => {
      ignore = true
    }
  }, [session.token])

  const value = useMemo(
    () => ({
      user: session.user,
      token: session.token,
      isAuthenticated: Boolean(session.token && session.user),
      isAuthLoading,
      async login(payload) {
        const response = await loginUser(payload)
        const nextSession = {
          token: response.token,
          user: response.data || response.user,
        }

        setSession(nextSession)
        setAuthToken(nextSession.token)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))

        return response
      },
      async register(payload) {
        const response = await registerUser(payload)
        const nextSession = {
          token: response.token,
          user: response.data || response.user,
        }

        setSession(nextSession)
        setAuthToken(nextSession.token)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))

        return response
      },
      logout() {
        setSession({ token: '', user: null })
        setAuthToken('')
        localStorage.removeItem(STORAGE_KEY)
      },
    }),
    [isAuthLoading, session],
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
