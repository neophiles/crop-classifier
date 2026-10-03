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
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', marginBottom: '3px' }}>
        <span>{label}</span>
        <span>{value} {unit}</span>
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
        style={{ width: '100%', height: '12px', margin: '0', display: 'block' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#666', marginTop: '2px' }}>
        <span>{min}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  )
}
