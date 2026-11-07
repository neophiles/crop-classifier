import { useState } from 'react'
import Button from '../common/Button'
import FarmInput from './FarmInputWidget'
import SoilInputWidget, { type SoilLevel, type SoilNutrient } from './SoilInputWidget'
import type { FarmWeather } from './FarmInputWidget'
import Tag from '../common/Tag'
import Text from '../common/Text'

export interface PredictionOutput {
  recommended_crop: string
  deficit_n_kg_ha: number
  deficit_p_kg_ha: number
  deficit_k_kg_ha: number
  urea_kg_ha: number
  dap_kg_ha: number
  mop_kg_ha: number
  total_cost_php: number
  total_yield_mt: number
  gross_revenue_php: number
  net_profit_php: number
}

export interface PredictionResult {
  output: PredictionOutput | null
}

interface InputContainerProps {
  onPrediction: (prediction: PredictionResult | null) => void
}

function isPredictionResult(value: unknown): value is PredictionResult {
  return (
    typeof value === 'object' &&
    value !== null &&
    'output' in value &&
    typeof value.output === 'object' &&
    value.output !== null &&
    'recommended_crop' in value.output &&
    typeof value.output.recommended_crop === 'string'
  )
}

export default function InputContainer({ onPrediction }: InputContainerProps) {
  const [soilLevels, setSoilLevels] = useState<Partial<Record<SoilNutrient, SoilLevel>>>({})
  const [soilPH, setSoilPH] = useState<{ value: number; optionId: string } | null>(null)
  const [farmArea, setFarmArea] = useState<number | ''>('')
  const [farmWeather, setFarmWeather] = useState<FarmWeather | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  function handleNutrientChange(label: SoilNutrient, level: SoilLevel) {
    setSoilLevels((current) => ({ ...current, [label]: level }))
  }

  async function submitPrediction() {
    setSubmissionError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nitrogen_level: soilLevels.Nitrogen,
          phosphorus_level: soilLevels.Phosphorus,
          potassium_level: soilLevels.Potassium,
          temperature_c: farmWeather?.temperature_2m,
          humidity_percent: farmWeather?.relative_humidity_2m,
          ph: soilPH?.value,
          rainfall_mm: farmWeather?.precipitation,
          area_ha: farmArea
        })
      })

      const data: unknown = await response.json()
      if (!response.ok) {
        const detail = (
          typeof data === 'object' &&
          data !== null &&
          'detail' in data
        ) ? data.detail : undefined
        throw new Error(typeof detail === 'string' ? detail : `Prediction request failed (${response.status}).`)
      }
      if (!isPredictionResult(data)) {
        throw new Error('The prediction service returned an unexpected response.')
      }

      onPrediction(data)
    } catch (error) {
      onPrediction(null)
      setSubmissionError(error instanceof Error ? error.message : 'Could not submit prediction.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit =
    soilLevels.Nitrogen !== undefined &&
    soilLevels.Phosphorus !== undefined &&
    soilLevels.Potassium !== undefined &&
    soilPH !== null &&
    farmArea !== '' &&
    farmArea > 0 &&
    farmWeather !== null &&
    !isSubmitting

  return (
    <div className="flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumn-none">
      <Tag className="self-start border-green-600 bg-green-100 text-green-600">
        <Text type="h2" size="lg">INPUT</Text>
      </Tag>
      <SoilInputWidget
        selectedLevels={soilLevels}
        selectedPHOption={soilPH?.optionId ?? null}
        onNutrientChange={handleNutrientChange}
        onPHChange={(value, optionId) => setSoilPH({ value, optionId })}
      />
      <FarmInput
        area={farmArea}
        weather={farmWeather}
        onAreaChange={setFarmArea}
        onWeatherChange={setFarmWeather}
      />
      {submissionError && <div role="alert" className="text-sm text-red-700">{submissionError}</div>}
      <Button
        className="bg-green-600 text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!canSubmit}
        onClick={submitPrediction}
      >
        <Text weight="bold">{isSubmitting ? 'Predicting...' : 'Predict Crop, Yield and Profit'}</Text>
      </Button>
    </div>
  )
}
