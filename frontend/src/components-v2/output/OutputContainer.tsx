import Tag from '../common/Tag'
import Text from '../common/Text'
import Widget from '../common/Widget'
import type { PredictionResult } from '../input/InputContainer'

interface OutputContainerProps {
  prediction: PredictionResult | null
}

export default function OutputContainer({ prediction }: OutputContainerProps) {
  const output = prediction?.output

  return (
    <div className="flex flex-col gap-4">
      <Tag className="self-start border-red-600 bg-red-100 text-red-600">
        <Text type="h2" size="lg">OUPUT</Text>
      </Tag>
      {output ? (
        <Widget className="rounded p-2">
          <Text type="h3" weight="bold">Recommended crop: {output.recommended_crop}</Text>
          <Text weight="bold">Estimated soil nutrient deficit (kg/ha)</Text>
          <Text>Nitrogen: {output.deficit_n_kg_ha}</Text>
          <Text>Phosphorus: {output.deficit_p_kg_ha}</Text>
          <Text>Potassium: {output.deficit_k_kg_ha}</Text>
          <Text weight="bold">Fertilizer plan (kg/ha)</Text>
          <Text>Urea: {output.urea_kg_ha}</Text>
          <Text>DAP: {output.dap_kg_ha}</Text>
          <Text>MOP: {output.mop_kg_ha}</Text>
          <Text>Total cost: ₱{output.total_cost_php.toFixed(2)}</Text>
          <Text>Estimated yield: {output.total_yield_mt.toFixed(4)} MT</Text>
          <Text>Gross revenue: ₱{output.gross_revenue_php.toFixed(2)}</Text>
          <Text>Net profit: ₱{output.net_profit_php.toFixed(2)}</Text>
        </Widget>
      ) : (
        <Widget className="rounded p-2 flex justify-center border border-dashed">
          <Text className="text-gray-400 text-center">
            No prediction yet. Need input first!
          </Text>
        </Widget>
      )}
    </div>
  )
}
