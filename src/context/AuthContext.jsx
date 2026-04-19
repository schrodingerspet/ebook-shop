/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { apiRequest } from '../utils/api'

const AUTH_STORAGE_KEY = 'ebook-shop-auth'
const AuthContext = createContext()

const readStoredUser = () => {
  const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
  if (!storedAuth) return null

  try {
    return JSON.parse(storedAuth)
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(readStoredUser)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const persistUser = useCallback((authData) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData))
    setUserInfo(authData)
  }, [])

  const clearAuth = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setUserInfo(null)
  }, [])

  const login = useCallback(async (credentials) => {
    setAuthLoading(true)
    setAuthError('')
    try {
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: credentials,
      })
      persistUser(data)
      return data
    } catch (error) {
      setAuthError(error.message)
      throw error
    } finally {
      setAuthLoading(false)
    }
  }, [persistUser])

  const register = useCallback(async (payload) => {
    setAuthLoading(true)
    setAuthError('')
    try {
      const data = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: payload,
      })
      persistUser(data)
      return data
    } catch (error) {
      setAuthError(error.message)
      throw error
    } finally {
      setAuthLoading(false)
    }
  }, [persistUser])

  const logout = useCallback(() => {
    clearAuth()
    setAuthError('')
  }, [clearAuth])

  const value = useMemo(
    () => ({
      userInfo,
      isLoggedIn: Boolean(userInfo?.token),
      authLoading,
      authError,
      login,
      register,
      logout,
      clearAuth,
    }),
    [userInfo, authLoading, authError, login, register, logout, clearAuth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
