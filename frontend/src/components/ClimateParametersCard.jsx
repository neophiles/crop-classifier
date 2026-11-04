import { useState } from 'react'
import SliderInput from './SliderInput'
import { fetchLiveWeather } from '../api/weatherService'
import { searchLocation, getUserCoordinates } from '../api/geocodingService'
import { fetchLocationName } from '../api/nominatimService'

export default function ClimateParametersCard({ inputs, onChange }) {
  const [loading, setLoading] = useState(false)
  const [statusMsg, setStatusMsg] = useState(null)
  const [isError, setIsError] = useState(false)
  const [locationName, setLocationName] = useState(null)

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

  return (
    <fieldset style={{ margin: 0, padding: '10px 14px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <legend style={{ fontSize: '13px', padding: '0 6px' }}>
        <strong>Climate & Farm Parameters</strong>
      </legend>

      {/* Location Search & GPS Controls */}
      <div style={{ marginBottom: '8px' }}>
        {/* City Search Controls */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
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
            style={{
              flex: 1,
              padding: '4px 6px',
              fontSize: '12px',
              border: '1px solid #999',
              borderRadius: '3px',
            }}
          />
          <button
            type="button"
            onClick={handleSearchSubmit}
            disabled={loading || !searchQuery.trim()}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleGPSLocation}
            disabled={loading}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            Use GPS
          </button>
        </div>

        {/* Dropdown choices if multiple cities found */}
        {searchResults.length > 1 && (
          <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '3px', padding: '4px', marginBottom: '6px', fontSize: '11px', maxHeight: '100px', overflowY: 'auto' }}>
            <span style={{ color: '#666', display: 'block', marginBottom: '2px', fontWeight: 'bold' }}>Choose location:</span>
            {searchResults.map((place, idx) => (
              <div
                key={idx}
                onClick={() => applyWeatherForCoords(place.latitude, place.longitude, place.displayName)}
                style={{
                  padding: '3px 6px',
                  cursor: 'pointer',
                  borderBottom: idx < searchResults.length - 1 ? '1px solid #eee' : 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f4f8')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {place.displayName}
              </div>
            ))}
          </div>
        )}

        {statusMsg && (
          <div
            style={{
              fontSize: '11px',
              marginBottom: '4px',
              color: isError ? '#c62828' : '#2e7d32',
            }}
          >
            {statusMsg}
          </div>
        )}
      </div>

      {/* Open-Meteo Readings & Active Location Display */}
      <div
        style={{
          padding: '8px 10px',
          backgroundColor: '#f9f9f9',
          border: '1px solid #ddd',
          borderRadius: '4px',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>
            Open-Meteo Readings
          </span>
          {locationName && (
            <span style={{ fontSize: '11px', color: '#0055aa', fontWeight: 'bold' }}>
              Location: {locationName}
            </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: '10px', color: '#777' }}>Temperature</span>
            <strong style={{ fontSize: '13px' }}>{inputs.temperature_c.toFixed(1)} °C</strong>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '10px', color: '#777' }}>Humidity</span>
            <strong style={{ fontSize: '13px' }}>{inputs.humidity_percent.toFixed(0)} %</strong>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '10px', color: '#777' }}>Rainfall</span>
            <strong style={{ fontSize: '13px' }}>{inputs.rainfall_mm.toFixed(1)} mm</strong>
          </div>
        </div>
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
      />
    </fieldset>
  )
}
