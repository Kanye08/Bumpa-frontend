import { useState, useEffect, useCallback } from 'react'
import { api } from '../api/client'

export function useAuth() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('bumpa_token')
    if (!token) { setLoading(false); return }

    api.me()
      .then(setUser)
      .catch(() => localStorage.removeItem('bumpa_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await api.login(email, password)
    localStorage.setItem('bumpa_token', data.token)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (name, email, password) => {
    const data = await api.register(name, email, password, password)
    localStorage.setItem('bumpa_token', data.token)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try { await api.logout() } catch (_) {}
    localStorage.removeItem('bumpa_token')
    setUser(null)
  }, [])

  return { user, loading, login, register, logout }
}
