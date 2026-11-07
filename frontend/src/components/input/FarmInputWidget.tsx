import { useState } from 'react'
import Widget from '../common/Widget'
import Text from '../common/Text'
import Button from '../common/Button'

export interface FarmWeather {
  latitude: number
  longitude: number
  temperature_2m: number
  relative_humidity_2m: number
  precipitation: number
}

interface FarmInputProps {
  area: number | ''
  weather: FarmWeather | null
  onAreaChange: (area: number | '') => void
  onWeatherChange: (weather: FarmWeather | null) => void
}

interface OpenMeteoResponse {
  current: Omit<FarmWeather, 'latitude' | 'longitude'>
}

function isOpenMeteoResponse(value: unknown): value is OpenMeteoResponse {
  if (typeof value !== 'object' || value === null || !('current' in value)) {
    return false
  }

  const current = value.current
  return (
    typeof current === 'object' &&
    current !== null &&
    'temperature_2m' in current &&
    typeof current.temperature_2m === 'number' &&
    Number.isFinite(current.temperature_2m) &&
    'relative_humidity_2m' in current &&
    typeof current.relative_humidity_2m === 'number' &&
    Number.isFinite(current.relative_humidity_2m) &&
    'precipitation' in current &&
    typeof current.precipitation === 'number' &&
    Number.isFinite(current.precipitation)
  )
}

function isGeolocationPositionError(value: unknown): value is GeolocationPositionError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    typeof value.code === 'number' &&
    'message' in value &&
    typeof value.message === 'string'
  )
}

export default function FarmInput({
  area,
  weather,
  onAreaChange,
  onWeatherChange
}: FarmInputProps) {
  const [isLoadingWeather, setIsLoadingWeather] = useState(false)
  const [weatherError, setWeatherError] = useState<string | null>(null)

  async function fetchWeatherForCurrentLocation() {
    setWeatherError(null)
    onWeatherChange(null)
    setIsLoadingWeather(true)

    try {
      if (!navigator.geolocation) {
        throw new Error('Location access is not supported by this browser.')
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          maximumAge: 60_000,
          timeout: 10_000
        })
      })

      const { latitude, longitude } = position.coords
      const params = new URLSearchParams({
        latitude: String(latitude),
        longitude: String(longitude),
        current: 'temperature_2m,relative_humidity_2m,precipitation'
      })
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)

      if (!response.ok) {
        throw new Error(`Weather request failed (${response.status}).`)
      }

      const data: unknown = await response.json()
      if (!isOpenMeteoResponse(data)) {
        throw new Error('Weather service returned an unexpected response.')
      }

      onWeatherChange({ latitude, longitude, ...data.current })
    } catch (error) {
      if (isGeolocationPositionError(error)) {
        const message = error.code === error.PERMISSION_DENIED
          ? 'Location permission was denied.'
          : error.code === error.TIMEOUT
            ? 'Could not get your location in time.'
            : 'Your location could not be determined.'
        setWeatherError(message)
      } else {
        setWeatherError(error instanceof Error ? error.message : 'Could not load weather data.')
      }
    } finally {
      setIsLoadingWeather(false)
    }
  }

  return (
    <Widget type="fieldset">
      <Text type="legend" size="lg" weight="bold" className="px-2">Farm</Text>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <Text type="label" weight="bold">Weather</Text>
            <Button
              className="bg-green-600 text-white disabled:cursor-wait disabled:opacity-60"
              disabled={isLoadingWeather}
              onClick={fetchWeatherForCurrentLocation}
            >
              <Text size="base" weight="bold">{isLoadingWeather ? 'Loading...' : 'Use GPS'}</Text>
            </Button>
          </div>
          <div className="p-2 flex border border-gray-300 bg-gray-100 rounded">
            <div className="w-full flex flex-col items-center">
              <Text>Temperature</Text>
              <Text weight="bold">{weather ? `${weather.temperature_2m.toFixed(1)} C` : '--'}</Text>
            </div>
            <div className="w-full flex flex-col items-center">
              <Text>Humidity</Text>
              <Text weight="bold">{weather ? `${weather.relative_humidity_2m} %` : '--'}</Text>
            </div>
            <div className="w-full flex flex-col items-center">
              <Text>Rainfall</Text>
              <Text weight="bold">{weather ? `${weather.precipitation.toFixed(1)} mm` : '--'}</Text>
            </div>
          </div>
          {weatherError && <div role="alert" className="text-xs text-red-700">{weatherError}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <Text type="label" weight="bold">{"Area (hectares)"}</Text>
          <input
            type="number"
            min={0}
            max={1000}
            value={area}
            onChange={(event) => {
              const value = event.target.value
              onAreaChange(value === '' ? '' : Number(value))
            }}
            placeholder="Enter farm area..."
            className="flex-1 outline rounded px-2 py-1 max-w-full text-xs md:text-sm lg:text-base"
          />
        </div>
      </div>
    </Widget>
  )
}
