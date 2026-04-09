import apiClient from './client'

export async function fetchMySavedEvents() {
  const response = await apiClient.get('/saved-events/my')
  return response.data
}

export async function getSavedEventById(savedEventId) {
  const response = await apiClient.get(`/saved-events/${savedEventId}`)
  return response.data
}

export async function saveEvent(payload) {
  const response = await apiClient.post('/saved-events', payload)
  return response.data
}

export async function updateSavedEvent(savedEventId, payload) {
  const response = await apiClient.put(`/saved-events/${savedEventId}`, payload)
  return response.data
}

export async function removeSavedEvent(savedEventId) {
  const response = await apiClient.delete(`/saved-events/${savedEventId}`)
  return response.data
}
