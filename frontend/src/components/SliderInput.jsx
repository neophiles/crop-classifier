export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  soilStyle = false,
}) {
  const progress = ((value - min) / (max - min)) * 100

  return (
    <div className={`form-control w-full ${soilStyle ? 'gap-2 border-b border-base-200 py-4 first:pt-0 last:border-b-0 last:pb-0' : ''}`}>
      <div className="flex items-end justify-between">
        <div>
          {soilStyle && (
            <span className="block text-[7px] text-base-content/60">Enter Data</span>
          )}
          <span className={soilStyle ? 'text-[13px] font-bold text-base-content/70' : 'text-sm font-semibold'}>
            {label}
          </span>
        </div>
        <span className={soilStyle ? 'rounded-box border border-base-300 px-4 py-2 text-[9px] font-bold text-base-content/70' : 'text-base-content/70'}>
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const val = step % 1 === 0 ? parseInt(e.target.value, 10) : parseFloat(e.target.value)
          onChange(val)
        }}
        aria-label={label}
        className={`range range-sm w-full ${soilStyle ? 'soil-range' : 'range-primary'}`}
        style={soilStyle ? {
          '--soil-progress': `${progress}%`,
          '--range-thumb': '#4D7101',
        } : undefined}
      />
      <div className={`flex justify-between text-xs text-base-content/60 ${soilStyle ? 'hidden' : 'mt-1'}`}>
        <span>{min}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}
