import Text from '../common/Text'

export default function Header() {
  return (
    <div className="sticky top-0 w-full py-2 px-4 flex justify-center bg-amber-500 text-white">
      <div className="w-full max-w-6xl">
        <Text type="h1">Crop Classifier</Text>
      </div>
    </div>
  )
}
