import SliderInput from './SliderInput'

export default function FarmAreaCard({ inputs, onChange }) {
  return (
    <section className="flex flex-col gap-1">
      <h2 className="w-[95%] self-center text-[15px] font-bold text-base-content/70">
        Farm Area
      </h2>
      <fieldset className="fieldset w-[95%] self-center rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
        <SliderInput
          label="Farm Area"
          value={inputs.area_ha}
          onChange={(val) => onChange('area_ha', val)}
          min={0.1}
          max={20}
          step={0.1}
          unit="ha"
          soilStyle
        />
      </fieldset>
    </section>
  )
}
