const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

const buildHeaders = (token, hasBody) => {
  const headers = {}

  if (hasBody) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export const apiRequest = async (
  path,
  { method = 'GET', body, token } = {},
) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: buildHeaders(token, body !== undefined),
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.message || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return data
}

export { API_BASE_URL }
