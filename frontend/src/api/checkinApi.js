import apiClient from './client'

export async function getAllCheckins(params = {}) {
  const response = await apiClient.get('/checkins', { params })
  return response.data
}

export async function getCheckinById(checkinId) {
  const response = await apiClient.get(`/checkins/${checkinId}`)
  return response.data
}

export async function createCheckin(payload) {
  const response = await apiClient.post('/checkins', payload)
  return response.data
}

export async function updateCheckin(checkinId, payload) {
  const response = await apiClient.put(`/checkins/${checkinId}`, payload)
  return response.data
}

export async function deleteCheckin(checkinId) {
  const response = await apiClient.delete(`/checkins/${checkinId}`)
  return response.data
}
