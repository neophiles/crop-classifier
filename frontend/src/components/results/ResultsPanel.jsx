export default function ResultsPanel({ result, areaHa, inputs }) {
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
    <div className="mx-auto w-[95%]">
      <div className="card-body gap-3 p-4 sm:p-6">
        <div className="border-b border-base-300 pb-2 text-center">
          <div className="mb-2 text-5xl" role="img" aria-label="Analysis complete">
            📋
          </div>
          <h1 className="text-[15px] font-bold text-[#4D7101]">
            Analysis Results Complete!
          </h1>
        </div>

        <div className="border-b border-base-300 pb-2">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#4D7101]">Parameters</h2>
            <span className="text-[15px] font-bold text-[#4D7101]">Value</span>
          </div>
          <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 text-[10px] text-base-content/70">
            <dt>Temperature:</dt>
            <dd className="text-right">{inputs.temperature_c.toFixed(0)}°C</dd>
            <dt>Precipitation:</dt>
            <dd className="text-right">{inputs.rainfall_mm.toFixed(0)} mm</dd>
            <dt>Humidity:</dt>
            <dd className="text-right">{inputs.humidity_percent.toFixed(0)}%</dd>
            <dt>Weather:</dt>
            <dd className="text-right">Live weather</dd>
          </dl>
        </div>

        <div className="pb-2">
          <h2 className="mb-1 text-[15px] font-bold text-[#4D7101]">Financial Summary</h2>
          <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 text-[10px] text-base-content/70">
            <dt>Profit:</dt>
            <dd className="text-right">
              PHP {output.net_profit_php?.toLocaleString() ?? 'N/A'}
            </dd>
            <dt>Hectares:</dt>
            <dd className="text-right">{areaHa} ha</dd>
          </dl>
        </div>

        <div className="pb-2">
          <h2 className="mb-1 text-[15px] font-bold text-[#4D7101]">Crop Performance</h2>
          <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-[10px] text-base-content/70">
            <dt>Crop Selection:</dt>
            <dd className="text-right font-medium capitalize">Status Confirmed</dd>
            <dt>Fertilizer Mix:</dt>
            <dd className="text-right font-medium">Status Confirmed</dd>
            <dt>Soil Test:</dt>
            <dd className="text-right font-medium">Status Confirmed</dd>
            <dt>Purchase:</dt>
            <dd className="text-right font-medium">Not available</dd>
          </dl>
        </div>

        <div>
          <h2 className="mb-1 text-[15px] font-bold text-[#4D7101]">Recommendations</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 rounded-box border border-base-300 px-4 py-2 text-[10px]">
              <span className="text-xl" role="img" aria-label="Crop recommendation">🌿</span>
              <span className="font-medium text-[#4D7101]">
                Crop Selection: {output.recommended_crop}
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-box border border-base-300 px-4 py-2 text-[10px]">
              <span className="text-xl" role="img" aria-label="Fertilizer recommendation">🧪</span>
              <span className="font-medium text-[#4D7101]">
                Fertilizer Application: Urea {output.urea_kg_ha}, DAP {output.dap_kg_ha}, MOP {output.mop_kg_ha}
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-box border border-base-300 px-4 py-2 text-[10px]">
              <span className="text-xl" role="img" aria-label="Soil monitoring recommendation">🔬</span>
              <span className="font-medium text-[#4D7101]">
                Soil Monitoring: Test for Nutrients
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            className="btn rounded-box border-[#D98308] bg-[#D98308] text-[12px] text-white hover:border-[#C27607] hover:bg-[#C27607]"
          >
            Download PDF
          </button>
          <button
            type="button"
            className="btn rounded-box border-[#D98308] bg-[#D98308] text-[12px] text-white hover:border-[#C27607] hover:bg-[#C27607]"
          >
            Share Link
          </button>
        </div>

      </div>
    </div>
  )
}
