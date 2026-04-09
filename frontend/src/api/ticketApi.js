import apiClient from './client'

function unwrapData(payload) {
  return payload?.data ?? payload
}

export async function fetchTickets() {
  const response = await apiClient.get('/tickets')
  return unwrapData(response.data)
}
