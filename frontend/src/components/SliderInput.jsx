export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
}) {
  return (
    <div className="form-control w-full">
      <div className="mb-1 flex items-center justify-between text-sm font-semibold">
        <span>{label}</span>
        <span className="text-base-content/70">{value} {unit}</span>
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
        className="range range-primary range-sm w-full"
      />
      <div className="mt-1 flex justify-between text-xs text-base-content/60">
        <span>{min}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}
