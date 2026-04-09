import apiClient from './client'

export async function createRegistration(payload) {
  const response = await apiClient.post('/registrations', payload)
  return response.data
}
