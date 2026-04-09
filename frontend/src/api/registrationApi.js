import apiClient from './client'

export async function createRegistration(payload) {
  const response = await apiClient.post('/registrations', payload)
  return response.data
}

export async function fetchMyRegistrations() {
  const response = await apiClient.get('/registrations/my')
  return response.data
}

export async function fetchAllRegistrations(params = {}) {
  const response = await apiClient.get('/registrations', { params })
  return response.data
}

export async function getRegistrationById(registrationId) {
  const response = await apiClient.get(`/registrations/${registrationId}`)
  return response.data
}

export async function updateRegistration(registrationId, payload) {
  const response = await apiClient.put(`/registrations/${registrationId}`, payload)
  return response.data
}

export async function deleteRegistration(registrationId) {
  const response = await apiClient.delete(`/registrations/${registrationId}`)
  return response.data
}
