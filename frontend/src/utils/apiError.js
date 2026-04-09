export function getApiErrorMessage(error, fallbackMessage) {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.code === 'ECONNABORTED') {
    return 'The server took too long to respond. Please try again.'
  }

  if (error?.message === 'Network Error') {
    return 'Could not connect to the backend server.'
  }

  return fallbackMessage
}
