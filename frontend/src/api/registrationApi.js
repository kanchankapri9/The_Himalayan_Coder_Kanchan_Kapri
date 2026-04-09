import apiClient from './client'

export async function createRegistration(payload) {
  const response = await apiClient.post('/registrations', payload)
  return response.data
}

export async function fetchMyRegistrations() {
  const response = await apiClient.get('/registrations/my')
  return response.data
}
