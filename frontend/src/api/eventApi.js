import apiClient from './client'

function unwrapData(payload) {
  return payload?.data ?? payload
}

export async function fetchEvents(params = {}) {
  const response = await apiClient.get('/events', { params })
  return unwrapData(response.data)
}

export async function fetchEventById(eventId) {
  const response = await apiClient.get(`/events/${eventId}`)
  return unwrapData(response.data)
}
