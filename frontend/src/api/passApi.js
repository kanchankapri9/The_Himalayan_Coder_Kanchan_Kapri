import apiClient from './client'

export async function fetchMyPasses() {
  const response = await apiClient.get('/passes/my')
  return response.data
}

export async function fetchPassById(passId) {
  const response = await apiClient.get(`/passes/${passId}`)
  return response.data
}
