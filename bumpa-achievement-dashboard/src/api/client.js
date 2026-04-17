const BASE = import.meta.env.VITE_API_URL ?? '/api'

function getToken() {
  return localStorage.getItem('bumpa_token')
}

function headers(extra = {}) {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    ...extra,
  }
}

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: headers(),
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  const data = await res.json()

  if (!res.ok) {
    const message =
      data?.message ||
      Object.values(data?.errors ?? {})?.[0]?.[0] ||
      `HTTP ${res.status}`
    throw new Error(message)
  }

  return data
}

export const api = {
  login: (email, password) =>
    request('POST', '/login', { email, password }),

  register: (name, email, password, password_confirmation) =>
    request('POST', '/register', { name, email, password, password_confirmation }),

  logout: () => request('POST', '/logout'),

  me: () => request('GET', '/me'),

  getAchievements: (userId) =>
    request('GET', `/users/${userId}/achievements`),

  makePurchase: (amount) =>
    request('POST', '/purchases', { amount }),

  getPurchases: () => request('GET', '/purchases'),
}
