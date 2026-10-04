/**
 * Service for fetching live weather data using Open-Meteo free API.
 * Free, open source, no API key required.
 */

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast'

/**
 * Fetches current weather from Open-Meteo for given coordinates.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{temperature_c: number, humidity_percent: number, rainfall_mm: number}>}
 */
export async function fetchLiveWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,precipitation',
    timezone: 'auto',
  })

  const response = await fetch(`${OPEN_METEO_BASE_URL}?${params.toString()}`)
  if (!response.ok) {
    throw new Error(`Open-Meteo API returned status ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()
  const current = data.current || {}

  return {
    temperature_c: current.temperature_2m ?? 0.0,
    humidity_percent: current.relative_humidity_2m ?? 0.0,
    rainfall_mm: current.precipitation ?? 0.0,
  }
}

