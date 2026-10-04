import Tag from '../common/Tag'
import Text from '../common/Text'
import Widget from '../common/Widget'

export default function OutputContainer() {
  return (
    <div className="flex flex-col gap-4">
      <Tag className="self-start border-red-600 bg-red-100 text-red-600">
        <Text type="h2" size="lg">OUPUT</Text>
      </Tag>
      <Widget className="rounded p-2 flex justify-center border border-dashed">
        <Text className="text-gray-400 text-center">
          No prediction yet. Need input first!
        </Text>
      </Widget>
    </div>
  )
}
