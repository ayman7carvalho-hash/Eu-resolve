import { createContext, useContext, useEffect, useState } from 'react'
import { base44 } from '@/api/base44Client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const [isLoadingPublicSettings] = useState(false)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    base44.auth
      .me()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setIsLoadingAuth(false))
  }, [])

  const navigateToLogin = () => {
    window.location.href = '/login'
  }

  const logout = async () => {
    await base44.auth.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        setAuthError,
        navigateToLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
