/**
 * Service functions for communication with the Crop Classifier FastAPI backend.
 */

export async function checkBackendHealth() {
  try {
    const res = await fetch('/api/health')
    return res.ok ? 'online' : 'offline'
  } catch {
    return 'offline'
  }
}

export async function predictCropAndOptimize(payload) {
  const res = await fetch('/api/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Server returned status ${res.status}: ${res.statusText}`)
  }

  return await res.json()
}

export async function fetchPredictionHistory() {
  const res = await fetch('/api/predictions')
  if (!res.ok) {
    throw new Error(`Failed to load predictions: ${res.statusText}`)
  }
  return await res.json()
}
