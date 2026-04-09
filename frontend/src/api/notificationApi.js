import apiClient from './client'

export async function getAllNotifications(params = {}) {
  const response = await apiClient.get('/notifications', { params })
  return response.data
}

export async function getNotificationById(notificationId) {
  const response = await apiClient.get(`/notifications/${notificationId}`)
  return response.data
}

export async function createNotification(payload) {
  const response = await apiClient.post('/notifications', payload)
  return response.data
}

export async function updateNotification(notificationId, payload) {
  const response = await apiClient.put(`/notifications/${notificationId}`, payload)
  return response.data
}

export async function deleteNotification(notificationId) {
  const response = await apiClient.delete(`/notifications/${notificationId}`)
  return response.data
}

export async function markNotificationAsRead(notificationId) {
  const response = await apiClient.put(`/notifications/${notificationId}`, { read: true })
  return response.data
}
