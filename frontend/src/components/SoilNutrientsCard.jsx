import SliderInput from './SliderInput'

export default function SoilNutrientsCard({ inputs, onChange }) {
  return (
    <fieldset style={{ margin: 0, padding: '10px 14px', border: '1px solid #ccc', borderRadius: '4px' }}>
      <legend style={{ fontSize: '13px', padding: '0 6px' }}>
        <strong>Soil Nutrients (NPK & pH)</strong>
      </legend>

      <SliderInput
        label="Nitrogen (N)"
        value={inputs.nitrogen}
        onChange={(val) => onChange('nitrogen', val)}
        min={0}
        max={140}
        unit="kg/ha"
      />

      <SliderInput
        label="Phosphorus (P)"
        value={inputs.phosphorus}
        onChange={(val) => onChange('phosphorus', val)}
        min={5}
        max={145}
        unit="kg/ha"
      />

      <SliderInput
        label="Potassium (K)"
        value={inputs.potassium}
        onChange={(val) => onChange('potassium', val)}
        min={5}
        max={205}
        unit="kg/ha"
      />

      <SliderInput
        label="Soil pH"
        value={inputs.ph}
        onChange={(val) => onChange('ph', val)}
        min={3.5}
        max={9.5}
        step={0.1}
      />
    </fieldset>
  )
}
