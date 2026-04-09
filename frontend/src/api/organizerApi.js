import apiClient from './client'

export async function getMyEvents(params = {}) {
  const response = await apiClient.get('/events/my', { params })
  return response.data
}

export async function getEventAnalytics(eventId) {
  const response = await apiClient.get(`/analytics/?eventId=${eventId}`)
  return response.data
}

export async function getEventRegistrations(eventId, params = {}) {
  const response = await apiClient.get(`/registrations?eventId=${eventId}`, { params })
  return response.data
}

export async function approveRegistration(registrationId) {
  const response = await apiClient.put(`/registrations/${registrationId}`, { status: 'approved' })
  return response.data
}

export async function rejectRegistration(registrationId) {
  const response = await apiClient.put(`/registrations/${registrationId}`, { status: 'rejected' })
  return response.data
}

export async function getOrganizerProfile() {
  const response = await apiClient.get('/users/profile')
  return response.data
}
