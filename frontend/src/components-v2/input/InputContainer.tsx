import Button from '../common/Button'
import FarmInput from './FarmInputWidget'
import SoilInputWidget from './SoilInputWidget'
import Tag from '../common/Tag'
import Text from '../common/Text'

export default function InputContainer() {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumn-none">
      <Tag className="self-start border-green-600 bg-green-100 text-green-600">
        <Text type="h2" size="lg">INPUT</Text>
      </Tag>
      <SoilInputWidget />
      <FarmInput />
      <Button className="bg-green-600 text-white">
        <Text weight="bold">Predict Crop, Yield and Profit</Text>
      </Button>
    </div>
  )
}
