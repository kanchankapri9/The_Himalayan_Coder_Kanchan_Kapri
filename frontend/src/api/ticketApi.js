import apiClient from './client'

export async function fetchTickets(params = {}) {
  const response = await apiClient.get('/tickets', { params })
  return response.data
}

export async function getTicketById(ticketId) {
  const response = await apiClient.get(`/tickets/${ticketId}`)
  return response.data
}

export async function createTicket(payload) {
  const response = await apiClient.post('/tickets', payload)
  return response.data
}

export async function updateTicket(ticketId, payload) {
  const response = await apiClient.put(`/tickets/${ticketId}`, payload)
  return response.data
}

export async function deleteTicket(ticketId) {
  const response = await apiClient.delete(`/tickets/${ticketId}`)
  return response.data
}
