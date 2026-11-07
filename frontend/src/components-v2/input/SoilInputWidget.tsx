import Widget from '../common/Widget'
import Text from '../common/Text'
import Button from '../common/Button'

export type SoilNutrient = 'Nitrogen' | 'Phosphorus' | 'Potassium'
export type SoilLevel = 'Low' | 'Medium' | 'High'

interface SoilInputWidgetProps {
  selectedLevels: Partial<Record<SoilNutrient, SoilLevel>>
  selectedPHOption: string | null
  onNutrientChange: (label: SoilNutrient, level: SoilLevel) => void
  onPHChange: (value: number, optionId: string) => void
}

const nutrientOptions: {
  label: SoilNutrient
  options: { level: SoilLevel; color: string }[]
}[] = [
  {
    label: 'Nitrogen',
    options: [
      { level: 'Low', color: 'bg-[#A15C1B]' },
      { level: 'Medium', color: 'bg-[#676F2B]' },
      { level: 'High', color: 'bg-[#2C6927]' }
    ]
  },
  {
    label: 'Phosphorus',
    options: [
      { level: 'Low', color: 'bg-[#B7C2C4]' },
      { level: 'Medium', color: 'bg-[#4d649a]' },
      { level: 'High', color: 'bg-[#161B43]' }
    ]
  },
  {
    label: 'Potassium',
    options: [
      { level: 'Low', color: 'bg-[#D5D3CA]' },
      { level: 'Medium', color: 'bg-[#CDB779]' },
      { level: 'High', color: 'bg-[#B45A1D]' }
    ]
  }
]

const phOptions: {
  kit: string
  options: { label: string; value: number; color: string }[]
}[] = [
  {
    kit: 'BTB',
    options: [
      { label: '6.0', value: 6.0, color: 'bg-[#9E842F]' },
      { label: '6.4', value: 6.4, color: 'bg-[#726D27]' },
      { label: '6.8', value: 6.8, color: 'bg-[#1F381A]' },
      { label: '7.2', value: 7.2, color: 'bg-[#253E22]' },
      { label: '> 7.2', value: 7.3, color: 'bg-[#1D3355]' }
    ]
  },
  {
    kit: 'CPR',
    options: [
      { label: '5.0', value: 5.0, color: 'bg-[#B67E27]' },
      { label: '5.4', value: 5.4, color: 'bg-[#852716]' },
      { label: '5.8', value: 5.8, color: 'bg-[#6D2319]' },
      { label: '6.0', value: 6.0, color: 'bg-[#592332]' }
    ]
  },
  {
    kit: 'BCG',
    options: [
      { label: '< 4.0', value: 3.9, color: 'bg-[#BD882E]' },
      { label: '4.0', value: 4.0, color: 'bg-[#40643E]' },
      { label: '4.4', value: 4.4, color: 'bg-[#325145]' },
      { label: '4.8', value: 4.8, color: 'bg-[#25284E]' },
      { label: '5.2', value: 5.2, color: 'bg-[#182047]' }
    ]
  }
]

export default function SoilInputWidget({
  selectedLevels,
  selectedPHOption,
  onNutrientChange,
  onPHChange
}: SoilInputWidgetProps) {
  return (
    <Widget type="fieldset">

      <Text type="legend" size="lg" weight="bold" className="px-2">Soil</Text>
      <Text className="text-gray-400">
        <b>IMPORTANT:</b>
        {" This assumes you are using the "}
        <a
          href="https://asi.cafs.uplb.edu.ph/soil-test-kit/"
          target="_blank"
          className="hover:underline"
        >
          UPLB-ASI Soil Test Kit
        </a>
        {"."}
      </Text>

      <div className="flex flex-col gap-2">
        {nutrientOptions.map(({ label, options }) => (
          <div key={label} className="flex flex-col gap-2 w-full">
            <Text type="label" weight="bold">{label}</Text>
            <div className="flex gap-2 text-white" role="group" aria-label={`${label} level`}>
              {options.map(({ level, color }) => {
                const isSelected = selectedLevels[label] === level
                return (
                  <Button
                    key={level}
                    className={`${color} w-full ${isSelected ? 'ring-2 ring-black ring-offset-2' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => onNutrientChange(label, level)}
                  >
                    <Text size="base">{level}</Text>
                  </Button>
                )
              })}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <Text type="label" weight="bold">pH Level</Text>
          {phOptions.map(({ kit, options }) => (
            <div key={kit} className="flex flex-col gap-2">
              <Text>{kit}</Text>
              <div className="flex gap-2 text-white" role="group" aria-label={`${kit} pH`}>
                {options.map(({ label, value, color }) => {
                  const optionId = `${kit}-${label}`
                  const isSelected = selectedPHOption === optionId
                  return (
                    <Button
                      key={label}
                      className={`${color} w-full ${isSelected ? 'ring-2 ring-black ring-offset-2' : ''}`}
                      aria-pressed={isSelected}
                      onClick={() => onPHChange(value, optionId)}
                    >
                      <Text>{label}</Text>
                    </Button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </Widget>
  )
}
