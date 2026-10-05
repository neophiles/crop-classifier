import { useState } from 'react'
import Header from './components/Header'
import SoilNutrientsCard from './components/SoilNutrientsCard'
import ClimateParametersCard from './components/ClimateParametersCard'
import FarmAreaCard from './components/FarmAreaCard'
import ResultsPanel from './components/results/ResultsPanel'
import HistoryPanel from './components/HistoryPanel'
import { INITIAL_INPUTS } from './constants/defaults'
import { predictCropAndOptimize } from './api/cropService'

export default function App() {
  const [inputs, setInputs] = useState(INITIAL_INPUTS)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [weatherDescription, setWeatherDescription] = useState(null)

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)
    setErrorMessage(null)

    try {
      const data = await predictCropAndOptimize(inputs)
      setResult(data)
    } catch (err) {
      setErrorMessage(err.message || 'Failed to connect to backend')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToInputs = () => {
    setResult(null)
    setErrorMessage(null)
  }

  const showInputs = !isLoading && !result

  return (
    <main className="container mx-auto max-w-6xl p-4 sm:p-6">
      <Header />

      {errorMessage && !isLoading && (
        <div role="alert" className="alert alert-error mb-4 py-3 text-sm">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      <div className={`grid items-start gap-6 ${showInputs ? '' : 'hidden'}`}>
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          <ClimateParametersCard
            inputs={inputs}
            onChange={handleInputChange}
            onWeatherUpdate={setWeatherDescription}
          />
          <FarmAreaCard inputs={inputs} onChange={handleInputChange} />
          <SoilNutrientsCard inputs={inputs} onChange={handleInputChange} />

          <button
            type="submit"
            disabled={isLoading}
            className="btn mx-auto w-fit rounded-full border-[#D98308] bg-[#D98308] px-12 text-[15px] text-white hover:border-[#C27607] hover:bg-[#C27607]"
          >
            Analyze
          </button>
        </form>

        <div className="hidden">
          <HistoryPanel />
        </div>
      </div>

      {isLoading ? (
        <section className="flex min-h-64 flex-col items-center justify-center gap-4 text-center">
          <span className="loading loading-spinner loading-lg text-[#D98308]" aria-hidden="true" />
          <h1 className="text-xl font-bold">Analyzing your inputs...</h1>
          <p className="text-sm text-base-content/60">
            Please wait while we calculate the best crop and fertilizer plan.
          </p>
        </section>
      ) : result ? (
        <section className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          <ResultsPanel
            result={result}
            areaHa={inputs.area_ha}
            inputs={inputs}
            weatherDescription={weatherDescription}
          />
          <button
            type="button"
            onClick={handleBackToInputs}
            className="btn mx-auto w-fit rounded-full border-[#D98308] bg-[#D98308] px-8 text-[15px] text-white hover:border-[#C27607] hover:bg-[#C27607]"
          >
            Back to Inputs
          </button>
        </section>
      ) : null}
    </main>
  )
}
