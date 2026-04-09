import apiClient from './client'

export async function getAllAnalytics(params = {}) {
  const response = await apiClient.get('/analytics', { params })
  return response.data
}

export async function getAnalyticsById(analyticsId) {
  const response = await apiClient.get(`/analytics/${analyticsId}`)
  return response.data
}

export async function createAnalytics(payload) {
  const response = await apiClient.post('/analytics', payload)
  return response.data
}

export async function updateAnalytics(analyticsId, payload) {
  const response = await apiClient.put(`/analytics/${analyticsId}`, payload)
  return response.data
}

export async function deleteAnalytics(analyticsId) {
  const response = await apiClient.delete(`/analytics/${analyticsId}`)
  return response.data
}
