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
    <div style={{ marginTop: '10px', borderTop: '1px solid #ddd', paddingTop: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleToggleHistory}
          style={{ padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}
        >
          {isOpen ? '▲ Hide Past Predictions' : '▼ View Past Predictions (SQLite Database)'}
        </button>
        {history && <span style={{ fontSize: '11px', color: '#666' }}>{history.length} records</span>}
      </div>

      {loading && <p style={{ fontSize: '12px', margin: '4px 0' }}>Loading database records...</p>}
      {error && <p style={{ color: 'red', fontSize: '12px', margin: '4px 0' }}>{error}</p>}

      {isOpen && history && (
        <div style={{ marginTop: '6px', maxHeight: '140px', overflowY: 'auto' }}>
          {history.length === 0 ? (
            <p style={{ fontSize: '12px' }}>No records saved yet.</p>
          ) : (
            <table border="1" cellPadding="3" style={{ borderCollapse: 'collapse', width: '100%', fontSize: '11px' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
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
                    <td><strong style={{ textTransform: 'capitalize' }}>{item.output?.recommended_crop ?? 'N/A'}</strong></td>
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
  )
}
