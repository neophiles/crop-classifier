import SliderInput from './SliderInput'

export default function ClimateParametersCard({ inputs, onChange }) {
  return (
    <fieldset style={{ margin: 0, padding: '10px 14px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <legend style={{ fontSize: '13px', padding: '0 6px' }}>
        <strong>Climate & Farm Parameters</strong>
      </legend>

      <SliderInput
        label="Temperature"
        value={inputs.temperature_c}
        onChange={(val) => onChange('temperature_c', val)}
        min={10}
        max={45}
        step={0.5}
        unit="°C"
      />

      <SliderInput
        label="Humidity"
        value={inputs.humidity_percent}
        onChange={(val) => onChange('humidity_percent', val)}
        min={15}
        max={100}
        step={1}
        unit="%"
      />

      <SliderInput
        label="Rainfall"
        value={inputs.rainfall_mm}
        onChange={(val) => onChange('rainfall_mm', val)}
        min={20}
        max={300}
        step={1}
        unit="mm"
      />

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
