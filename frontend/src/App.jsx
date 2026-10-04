import { useState, useEffect } from 'react'
import Header from './components/Header'
import SoilNutrientsCard from './components/SoilNutrientsCard'
import ClimateParametersCard from './components/ClimateParametersCard'
import ResultsPanel from './components/results/ResultsPanel'
import HistoryPanel from './components/HistoryPanel'
import { INITIAL_INPUTS } from './constants/defaults'
import { checkBackendHealth, predictCropAndOptimize } from './api/cropService'

export default function App() {
  const [inputs, setInputs] = useState(INITIAL_INPUTS)
  const [backendStatus, setBackendStatus] = useState('checking')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    checkBackendHealth().then(setBackendStatus)
  }, [])

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
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

  return (
    <main className="container mx-auto max-w-6xl p-4 sm:p-6">
      <Header backendStatus={backendStatus} />

      {errorMessage && (
        <div role="alert" className="alert alert-error mb-4 py-3 text-sm">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <SoilNutrientsCard inputs={inputs} onChange={handleInputChange} />
          <ClimateParametersCard inputs={inputs} onChange={handleInputChange} />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading && <span className="loading loading-spinner loading-sm" aria-hidden="true" />}
            {isLoading ? 'Processing...' : 'Submit Prediction'}
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <ResultsPanel result={result} areaHa={inputs.area_ha} />
          <HistoryPanel />
        </div>
      </div>
    </main>
  )
}
