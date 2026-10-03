export default function ResultsPanel({ result, areaHa }) {
  if (!result?.output) {
    return (
      <div style={{ border: '1px dashed #aaa', padding: '24px', textAlign: 'center', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
          No prediction yet. Adjust the sliders and click "Submit Prediction".
        </p>
      </div>
    )
  }

  const { output } = result

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px 18px', boxSizing: 'border-box', borderRadius: '4px' }}>
      <div style={{ borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '12px', color: '#666' }}>Recommended Crop:</span>
        <h3 style={{ margin: '3px 0 0 0', fontSize: '22px', textTransform: 'capitalize', color: '#0055aa' }}>
          {output.recommended_crop}
        </h3>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>
          Optimal Fertilizer Plan (kg/ha):
        </strong>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px' }}>
          <span>Urea: <strong>{output.urea_kg_ha}</strong></span>
          <span>DAP: <strong>{output.dap_kg_ha}</strong></span>
          <span>MOP: <strong>{output.mop_kg_ha}</strong></span>
        </div>
        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
          Deficits: N: {output.deficit_n_kg_ha} | P: {output.deficit_p_kg_ha} | K: {output.deficit_k_kg_ha} kg/ha
        </div>
      </div>

      <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #eee' }} />

      <div>
        <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>
          Financial Estimates ({areaHa} ha):
        </strong>
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%', fontSize: '12px', borderColor: '#ddd' }}>
          <tbody>
            <tr>
              <td style={{ padding: '6px 8px' }}>Estimated Yield</td>
              <td style={{ padding: '6px 8px' }}><strong>{output.total_yield_mt?.toFixed(2)} MT</strong></td>
            </tr>
            <tr>
              <td style={{ padding: '6px 8px' }}>Fertilizer Cost</td>
              <td style={{ padding: '6px 8px' }}>PHP {output.total_cost_php?.toLocaleString()}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 8px' }}>Gross Revenue</td>
              <td style={{ padding: '6px 8px' }}>PHP {output.gross_revenue_php?.toLocaleString()}</td>
            </tr>
            <tr>
              <td style={{ padding: '6px 8px' }}><strong>Net Profit</strong></td>
              <td style={{ padding: '6px 8px' }}><strong style={{ color: 'green' }}>PHP {output.net_profit_php?.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
