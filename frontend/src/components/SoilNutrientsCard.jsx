import SliderInput from './SliderInput'

export default function SoilNutrientsCard({ inputs, onChange }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[15px] font-bold text-base-content/70">
        Soil Information
      </h2>

      <fieldset className="fieldset w-[95%] self-center rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">

        <SliderInput
          label="pH"
          value={inputs.ph}
          onChange={(val) => onChange('ph', val)}
          min={3.5}
          max={9.5}
          step={0.1}
          unit="kg/ha"
          soilStyle
        />

        <SliderInput
          label="Nitrogen (N)"
          value={inputs.nitrogen}
          onChange={(val) => onChange('nitrogen', val)}
          min={0}
          max={140}
          unit="kg/ha"
          soilStyle
        />

        <SliderInput
          label="Phosphorus (P)"
          value={inputs.phosphorus}
          onChange={(val) => onChange('phosphorus', val)}
          min={5}
          max={145}
          unit="kg/ha"
          soilStyle
        />

        <SliderInput
          label="Potassium (K)"
          value={inputs.potassium}
          onChange={(val) => onChange('potassium', val)}
          min={5}
          max={205}
          unit="kg/ha"
          soilStyle
        />
      </fieldset>
    </section>
  )
}
