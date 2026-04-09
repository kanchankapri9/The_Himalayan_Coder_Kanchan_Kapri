import apiClient from './client'

export async function fetchTickets(params = {}) {
  const response = await apiClient.get('/tickets', { params })
  return response.data
}
