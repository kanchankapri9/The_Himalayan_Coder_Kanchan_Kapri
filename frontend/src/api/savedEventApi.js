import apiClient from './client'

export async function fetchMySavedEvents() {
  const response = await apiClient.get('/saved-events/my')
  return response.data
}
