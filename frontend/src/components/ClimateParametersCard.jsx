import { useState } from 'react'
import SliderInput from './SliderInput'
import ForecastSummary from './weather/ForecastSummary'
import { fetchLiveWeather } from '../api/weatherService'
import { searchLocation, getUserCoordinates } from '../api/geocodingService'
import { fetchLocationName } from '../api/nominatimService'

export default function ClimateParametersCard({ inputs, onChange }) {
  const [loading, setLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const [locationName, setLocationName] = useState(null)
  const [weatherUpdatedAt, setWeatherUpdatedAt] = useState(null)

  // Search input state
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // Helper to apply weather for specific coordinates
  const applyWeatherForCoords = async (latitude, longitude, displayName) => {
    setLoading(true)
    setStatusMsg(`Loading weather for ${displayName || 'location'}...`)
    setIsError(false)

    try {
      const weather = await fetchLiveWeather(latitude, longitude)

      onChange('temperature_c', weather.temperature_c)
      onChange('humidity_percent', weather.humidity_percent)
      onChange('rainfall_mm', weather.rainfall_mm)

      setWeatherUpdatedAt(new Date())
      setLocationName(displayName || `Coordinates: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`)
      setStatusMsg('Weather updated successfully.')
      setSearchResults([])
    } catch (err) {
      setIsError(true)
      setStatusMsg(err.message || 'Failed to load weather data.')
    } finally {
      setLoading(false)
    }
  }

  // Handle GPS location click
  const handleGPSLocation = async () => {
    setLoading(true)
    setStatusMsg('Requesting GPS location...')
    setIsError(false)

    try {
      const { latitude, longitude } = await getUserCoordinates()
      setStatusMsg('Resolving GPS location...')

      const [weather, resolvedLocation] = await Promise.all([
        fetchLiveWeather(latitude, longitude),
        fetchLocationName(latitude, longitude),
      ])

      onChange('temperature_c', weather.temperature_c)
      onChange('humidity_percent', weather.humidity_percent)
      onChange('rainfall_mm', weather.rainfall_mm)

      setWeatherUpdatedAt(new Date())
      const name = resolvedLocation
        ? `${resolvedLocation} (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`
        : `Coordinates: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`

      setLocationName(name)
      setStatusMsg('Weather updated from current GPS.')
    } catch (err) {
      setIsError(true)
      setStatusMsg(err.message || 'Failed to fetch GPS weather.')
    } finally {
      setLoading(false)
    }
  }

  // Handle city search submission
  const handleSearchSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    setStatusMsg(`Searching for "${searchQuery}"...`)
    setIsError(false)

    try {
      const results = await searchLocation(searchQuery)
      if (results.length === 0) {
        setIsError(true)
        setStatusMsg(`No places found for "${searchQuery}".`)
        setSearchResults([])
      } else if (results.length === 1) {
        // Only one result found, auto-select it
        const place = results[0]
        await applyWeatherForCoords(place.latitude, place.longitude, place.displayName)
      } else {
        // Multiple matches, show options to pick
        setSearchResults(results)
        setStatusMsg('Select matching location below:')
      }
    } catch (err) {
      setIsError(true)
      setStatusMsg(err.message || 'Search failed.')
    } finally {
      setLoading(false)
    }
  }

  const formattedWeatherDate = weatherUpdatedAt
    ? new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      year: 'numeric',
    }).format(weatherUpdatedAt)
    : null

  const formattedWeatherTime = weatherUpdatedAt
    ? new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(weatherUpdatedAt)
    : null

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[15px] font-bold text-base-content/70">
        Today&apos;s Forecast
      </h2>
      <fieldset className="fieldset rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
        <ForecastSummary
          temperature={inputs.temperature_c}
          locationName={locationName}
          formattedDate={formattedWeatherDate}
          formattedTime={formattedWeatherTime}
        />

      {/* Location Search & GPS Controls */}
      <div className="mb-4">
        {/* City Search Controls */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            placeholder="Search other city/province..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearchSubmit()
              }
            }}
            disabled={loading}
            aria-label="Search for a city or province"
            className="input input-bordered input-sm w-full sm:flex-1"
          />
          <button
            type="button"
            onClick={handleSearchSubmit}
            disabled={loading || !searchQuery.trim()}
            className="btn btn-outline btn-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleGPSLocation}
            disabled={loading}
            className="btn btn-sm rounded-full border-[#D98308] bg-[#D98308] text-white hover:border-[#C27607] hover:bg-[#C27607]"
          >
            Use GPS
          </button>
        </div>

        {/* Dropdown choices if multiple cities found */}
        {searchResults.length > 1 && (
          <div className="mt-2 max-h-32 overflow-y-auto rounded-box border border-base-300 bg-base-100 p-2 text-sm">
            <span className="mb-1 block font-semibold text-base-content/70">Choose location:</span>
            {searchResults.map((place, idx) => (
              <div
                key={idx}
                onClick={() => applyWeatherForCoords(place.latitude, place.longitude, place.displayName)}
                className={`cursor-pointer px-2 py-1.5 hover:bg-base-200 ${idx < searchResults.length - 1 ? 'border-b border-base-200' : ''}`}
              >
                {place.displayName}
              </div>
            ))}
          </div>
        )}

        {statusMsg && (
          <div className={`mt-2 text-sm ${isError ? 'text-error' : 'text-success'}`}>
            {statusMsg}
          </div>
        )}
      </div>

      {/* Farm Area Slider */}
      <SliderInput
        label="Farm Area"
        value={inputs.area_ha}
        onChange={(val) => onChange('area_ha', val)}
        min={0.1}
        max={20}
        step={0.1}
        unit="ha"
        soilStyle
      />
      </fieldset>
    </section>
  )
}
