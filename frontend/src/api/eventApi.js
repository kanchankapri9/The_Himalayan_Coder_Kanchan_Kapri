import apiClient from './client'

export async function fetchEvents(params = {}) {
  const response = await apiClient.get('/events', { params })
  return response.data
}

export async function fetchEventById(eventId) {
  const response = await apiClient.get(`/events/${eventId}`)
  return response.data
}
