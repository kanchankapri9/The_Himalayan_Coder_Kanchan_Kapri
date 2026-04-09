import apiClient from './client'

export async function fetchMyPasses() {
  const response = await apiClient.get('/passes/my')
  return response.data
}

export async function fetchAllPasses(params = {}) {
  const response = await apiClient.get('/passes', { params })
  return response.data
}

export async function fetchPassById(passId) {
  const response = await apiClient.get(`/passes/${passId}`)
  return response.data
}

export async function createPass(payload) {
  const response = await apiClient.post('/passes', payload)
  return response.data
}

export async function updatePass(passId, payload) {
  const response = await apiClient.put(`/passes/${passId}`, payload)
  return response.data
}

export async function deletePass(passId) {
  const response = await apiClient.delete(`/passes/${passId}`)
  return response.data
}
