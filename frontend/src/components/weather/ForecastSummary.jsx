import WeatherIllustration from './WeatherIllustration'

const hourlyForecast = ['8 AM', '9 AM', '10 AM', '11 AM']

export default function ForecastSummary({
  temperature,
  locationName,
  formattedDate,
  formattedTime,
}) {
  return (
    <div className="mb-4 rounded-box border border-base-300 bg-base-100 px-4 py-5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <strong className="text-[48px] font-bold leading-none text-[#D98308]">
            {temperature.toFixed(0)}°
          </strong>
          <span className="mt-2 block whitespace-nowrap text-[8px] text-base-content/70">
            {locationName || 'Select a location for live weather'}
          </span>
        </div>
        <div className="min-w-0 text-left">
          {formattedDate && (
            <span className="block text-[10px] font-semibold text-base-content/70">
              {formattedDate}
            </span>
          )}
          {formattedTime && (
            <span className="block text-[10px] font-semibold text-base-content/70">
              {formattedTime}
            </span>
          )}
        </div>
        <WeatherIllustration />
      </div>
      <div className="mt-4 border-t border-base-300" />
      <div className="mt-4 flex w-full justify-center gap-1 pb-1">
        <div className="flex w-28 shrink-0 flex-col items-center gap-2">
          <button
            type="button"
            aria-pressed="true"
            className="btn h-fit min-h-0 w-24 min-w-0 rounded-box border-[#4D7101] bg-[#4D7101] px-0 py-2 text-[6px] whitespace-nowrap text-white hover:border-[#3D5A01] hover:bg-[#3D5A01]"
          >
            Hourly Forecast
          </button>
          <button
            type="button"
            aria-pressed="false"
            className="btn h-fit min-h-0 w-24 min-w-0 rounded-box border-base-300 bg-base-100 px-0 py-2 text-[6px] whitespace-nowrap text-[#4D7101] hover:bg-base-200"
          >
            Weekly Forecast
          </button>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-4 gap-2">
          {hourlyForecast.map((hour) => (
            <div
              key={hour}
              className="flex min-w-10 flex-col items-center justify-center gap-1 rounded-box border border-base-300 px-1 py-1"
            >
              <span className="text-[6px] font-semibold text-[#D98308]">{hour}</span>
              <svg viewBox="0 0 32 32" aria-hidden="true" className="h-5 w-5">
                <circle cx="16" cy="16" r="6" fill="#D98308" />
                <g stroke="#D98308" strokeLinecap="round" strokeWidth="2">
                  <path d="M16 3v4M16 25v4M3 16h4M25 16h4M7 7l3 3M22 22l3 3M25 7l-3 3M10 22l-3 3" />
                </g>
              </svg>
              <span className="text-[6px] font-semibold text-[#D98308]">
                {temperature.toFixed(0)}°
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
