import Widget from './common/Widget'
import Text from './common/Text'
import Button from './common/Button'

export default function FarmInput() {
  return (
    <Widget type="fieldset">
      <Text type="legend" size="lg" weight="bold" className="px-2">Farm</Text>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <Text type="label" weight="bold">Weather</Text>
            <Button className="bg-green-600 text-white">
              <Text size="base" weight="bold">Use GPS</Text>
            </Button>
          </div>
          <div className="p-2 flex border border-gray-300 bg-gray-100 rounded">
            <div className="w-full flex flex-col items-center">
              <Text>Temperature</Text>
              <Text weight="bold">21.0 C</Text>
            </div>
            <div className="w-full flex flex-col items-center">
              <Text>Humidity</Text>
              <Text weight="bold">82 %</Text>
            </div>
            <div className="w-full flex flex-col items-center">
              <Text>Rainfall</Text>
              <Text weight="bold">200.0 mm</Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Text type="label" weight="bold">{"Area (hectares)"}</Text>
          <input
            type="number"
            min={0}
            max={1000}
            defaultValue={0}
            placeholder="Enter farm area..."
            className="flex-1 outline rounded px-2 py-1 max-w-full text-xs md:text-sm lg:text-base"
          />
        </div>
      </div>
    </Widget>
  )
}
