import { useState } from 'react'
import { fetchPredictionHistory } from '../api/cropService'

export default function HistoryPanel() {
  const [history, setHistory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleHistory = async () => {
    if (!isOpen && !history) {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchPredictionHistory()
        setHistory(data)
      } catch (err) {
        setError(err.message || 'Failed to fetch history')
      } finally {
        setLoading(false)
      }
    }
    setIsOpen(!isOpen)
  }

  return (
    <div className="collapse collapse-arrow border border-base-300 bg-base-100">
      <input
        type="checkbox"
        checked={isOpen}
        onChange={handleToggleHistory}
        aria-label="Toggle past predictions"
      />
      <div className="collapse-title flex items-center justify-between pr-12 text-base font-semibold">
        <span>Past Predictions</span>
        {history && <span className="badge badge-neutral">{history.length} records</span>}
      </div>
      <div className="collapse-content">
        <div className="pt-2">
        <button
          type="button"
          onClick={handleToggleHistory}
          className="btn btn-ghost btn-xs mb-2"
        >
          {isOpen ? 'Hide past predictions' : 'View past predictions'}
        </button>

        {loading && (
          <p className="flex items-center gap-2 py-2 text-sm text-base-content/70">
            <span className="loading loading-spinner loading-xs" aria-hidden="true" />
            Loading database records...
          </p>
        )}
        {error && <p className="alert alert-error py-2 text-sm">{error}</p>}

        {isOpen && history && (
          <div className="max-h-48 overflow-auto">
          {history.length === 0 ? (
            <p className="py-2 text-sm text-base-content/70">No records saved yet.</p>
          ) : (
            <table className="table table-zebra table-xs">
              <thead className="sticky top-0 z-10 bg-base-200">
                <tr>
                  <th>Crop</th>
                  <th>N-P-K</th>
                  <th>Temp</th>
                  <th>Humidity</th>
                  <th>Rain</th>
                  <th>Area</th>
                  <th>Net Profit</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td className="font-semibold capitalize">{item.output?.recommended_crop ?? 'N/A'}</td>
                    <td>{item.nitrogen}-{item.phosphorus}-{item.potassium}</td>
                    <td>{item.temperature_c}°C</td>
                    <td>{item.humidity_percent}%</td>
                    <td>{item.rainfall_mm}mm</td>
                    <td>{item.area_ha}ha</td>
                    <td>{item.output ? `PHP ${item.output.net_profit_php?.toLocaleString()}` : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
