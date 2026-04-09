import apiClient from './client'

export async function getAllUsers(params = {}) {
  const response = await apiClient.get('/users', { params })
  return response.data
}

export async function getUserById(userId) {
  const response = await apiClient.get(`/users/${userId}`)
  return response.data
}

export async function createUser(payload) {
  const response = await apiClient.post('/users', payload)
  return response.data
}

export async function updateUser(userId, payload) {
  const response = await apiClient.put(`/users/${userId}`, payload)
  return response.data
}

export async function deleteUser(userId) {
  const response = await apiClient.delete(`/users/${userId}`)
  return response.data
}
