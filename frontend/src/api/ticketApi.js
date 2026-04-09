import apiClient from './client'

export async function fetchTickets() {
  const response = await apiClient.get('/tickets')
  return response.data
}
