import apiClient from './client'

export async function fetchEvents(params = {}) {
  const response = await apiClient.get('/events', { params })
  return response.data
}

export async function fetchEventById(eventId) {
  const response = await apiClient.get(`/events/${eventId}`)
  return response.data
}

export async function createEvent(payload) {
  const response = await apiClient.post('/events', payload)
  return response.data
}

export async function updateEvent(eventId, payload) {
  const response = await apiClient.put(`/events/${eventId}`, payload)
  return response.data
}

export async function deleteEvent(eventId) {
  const response = await apiClient.delete(`/events/${eventId}`)
  return response.data
}
