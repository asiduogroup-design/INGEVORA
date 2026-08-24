import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('ingevora_user')
  if (!stored) {
    return config
  }

  try {
    const parsed = JSON.parse(stored)
    if (parsed?.token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${parsed.token}`
    }
  } catch {
    // Ignore malformed local storage payloads and continue unauthenticated.
  }

  return config
})
