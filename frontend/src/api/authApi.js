import apiClient from './client'

function unwrapData(payload) {
  return payload?.data ?? payload
}

export async function registerUser(payload) {
  const response = await apiClient.post('/auth/register', payload)
  const body = response.data
  return {
    token: body?.token,
    user: unwrapData(body),
  }
}

export async function loginUser(payload) {
  const response = await apiClient.post('/auth/login', payload)
  const body = response.data
  return {
    token: body?.token,
    user: unwrapData(body),
  }
}

export async function getCurrentUser() {
  const response = await apiClient.get('/auth/me')
  return unwrapData(response.data)
}
