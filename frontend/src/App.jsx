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
    <div style={{ maxWidth: '1060px', margin: '16px auto', fontFamily: 'sans-serif', padding: '0 20px', boxSizing: 'border-box' }}>
      <Header backendStatus={backendStatus} />

      {errorMessage && (
        <div style={{ padding: '8px 12px', backgroundColor: '#ffebee', color: '#c62828', marginBottom: '12px', border: '1px solid #c62828', borderRadius: '4px', fontSize: '12px' }}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      {/* Main Layout: Sliders stacked on the left, Results on the right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: Sliders stacked vertically + Submit button */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SoilNutrientsCard inputs={inputs} onChange={handleInputChange} />
          <ClimateParametersCard inputs={inputs} onChange={handleInputChange} />

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '9px 14px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderRadius: '4px',
              border: '1px solid #999',
              backgroundColor: '#f8f8f8',
            }}
          >
            {isLoading ? 'Processing...' : 'Submit Prediction (POST /predict)'}
          </button>
        </form>

        {/* Right Column: Results & History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <ResultsPanel result={result} areaHa={inputs.area_ha} />
          <HistoryPanel />
        </div>

      </div>
    </div>
  )
}
