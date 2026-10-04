import SliderInput from './SliderInput'

export default function SoilNutrientsCard({ inputs, onChange }) {
  return (
    <fieldset className="fieldset rounded-box border border-base-300 bg-base-100 p-4">
      <legend className="fieldset-legend px-1 text-base font-semibold">
        Soil Nutrients (NPK & pH)
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
