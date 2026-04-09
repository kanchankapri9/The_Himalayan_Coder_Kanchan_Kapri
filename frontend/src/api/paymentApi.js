import apiClient from './client'

export async function getAllPayments(params = {}) {
  const response = await apiClient.get('/payments', { params })
  return response.data
}

export async function getPaymentById(paymentId) {
  const response = await apiClient.get(`/payments/${paymentId}`)
  return response.data
}

export async function createPayment(payload) {
  const response = await apiClient.post('/payments', payload)
  return response.data
}

export async function updatePayment(paymentId, payload) {
  const response = await apiClient.put(`/payments/${paymentId}`, payload)
  return response.data
}

export async function deletePayment(paymentId) {
  const response = await apiClient.delete(`/payments/${paymentId}`)
  return response.data
}
