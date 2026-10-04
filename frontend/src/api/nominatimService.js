/**
 * Service for reverse geocoding coordinates into human-readable place names
 * using OpenStreetMap's Nominatim service.
 * Free, open source, no API key required.
 */

const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse'

/**
 * Resolves human-readable city/region name from latitude and longitude
 * using OpenStreetMap's Nominatim reverse geocoding service.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<string | null>}
 */
export async function fetchLocationName(latitude, longitude) {
  try {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      format: 'json',
    })

    const res = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'CropClassifierApp/1.0',
      },
    })

    if (!res.ok) return null
    const data = await res.json()
    const addr = data.address || {}

    const city = addr.city || addr.town || addr.municipality || addr.village || addr.suburb || addr.county || ''
    const country = addr.country || ''

    if (city && country) {
      return `${city}, ${country}`
    }
    return city || country || null
  } catch {
    return null
  }
}
