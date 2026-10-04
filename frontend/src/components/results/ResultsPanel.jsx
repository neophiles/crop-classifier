export default function ResultsPanel({ result, areaHa }) {
  if (!result?.output) {
    return (
      <div className="card min-h-48 border border-dashed border-base-300 bg-base-100">
        <div className="card-body items-center justify-center text-center">
          <p className="text-sm text-base-content/60">
          No prediction yet. Adjust the sliders and click "Submit Prediction".
          </p>
        </div>
      </div>
    )
  }

  const { output } = result

  return (
    <div className="card border border-base-300 bg-base-100">
      <div className="card-body gap-5 p-4 sm:p-6">
        <div className="border-b border-base-300 pb-3">
          <span className="text-sm text-base-content/60">Recommended Crop</span>
          <h2 className="mt-1 text-2xl font-bold capitalize text-primary">
          {output.recommended_crop}
          </h2>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold">Optimal Fertilizer Plan (kg/ha)</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="stat rounded-box bg-base-200 p-3">
              <div className="stat-title text-xs">Urea</div>
              <div className="stat-value text-lg">{output.urea_kg_ha}</div>
              <div className="stat-desc">kg/ha</div>
            </div>
            <div className="stat rounded-box bg-base-200 p-3">
              <div className="stat-title text-xs">DAP</div>
              <div className="stat-value text-lg">{output.dap_kg_ha}</div>
              <div className="stat-desc">kg/ha</div>
            </div>
            <div className="stat rounded-box bg-base-200 p-3">
              <div className="stat-title text-xs">MOP</div>
              <div className="stat-value text-lg">{output.mop_kg_ha}</div>
              <div className="stat-desc">kg/ha</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-base-content/60">
            Deficits: N: {output.deficit_n_kg_ha} | P: {output.deficit_p_kg_ha} | K: {output.deficit_k_kg_ha} kg/ha
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold">Financial Estimates ({areaHa} ha)</h3>
          <div className="overflow-x-auto">
            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>Estimated Yield</td>
                  <td className="text-right font-semibold">{output.total_yield_mt?.toFixed(2)} MT</td>
                </tr>
                <tr>
                  <td>Fertilizer Cost</td>
                  <td className="text-right">PHP {output.total_cost_php?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Gross Revenue</td>
                  <td className="text-right">PHP {output.gross_revenue_php?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="font-bold">Net Profit</td>
                  <td className="text-right font-bold text-success">PHP {output.net_profit_php?.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
