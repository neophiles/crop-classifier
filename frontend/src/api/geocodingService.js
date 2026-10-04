/**
 * Service for location searching via Open-Meteo Geocoding API
 * and retrieving browser coordinates via the Geolocation API.
 * Free, open source, no API key required.
 */

const OPEN_METEO_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'

/**
 * Searches locations worldwide by name using Open-Meteo Geocoding API.
 * @param {string} query
 * @returns {Promise<Array<{name: string, region: string, country: string, latitude: number, longitude: number, displayName: string}>>}
 */
export async function searchLocation(query) {
  if (!query || query.trim().length < 2) return []

  try {
    const params = new URLSearchParams({
      name: query.trim(),
      count: '5',
      language: 'en',
      format: 'json',
    })

    const res = await fetch(`${OPEN_METEO_GEOCODING_URL}?${params.toString()}`)
    if (!res.ok) return []
    const data = await res.json()

    return (data.results || []).map((r) => ({
      name: r.name,
      region: r.admin1 || '',
      country: r.country || '',
      latitude: r.latitude,
      longitude: r.longitude,
      displayName: [r.name, r.admin1, r.country].filter(Boolean).join(', '),
    }))
  } catch {
    return []
  }
}

/**
 * Gets user latitude and longitude from browser Geolocation API.
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export function getUserCoordinates() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied by user.'))
            break
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable.'))
            break
          case error.TIMEOUT:
            reject(new Error('Location request timed out.'))
            break
          default:
            reject(new Error('An unknown error occurred while retrieving location.'))
        }
      },
      { timeout: 10000 }
    )
  })
}
