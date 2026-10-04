import Widget from '../common/Widget'
import Text from '../common/Text'
import Button from '../common/Button'

export default function SoilInputWidget() {
  return (
    <Widget type="fieldset">

      <Text type="legend" size="lg" weight="bold" className="px-2">Soil</Text>
      <Text className="text-gray-400">
        <b>IMPORTANT:</b>
        {" This assumes you are using the "}
        <a
          href="https://asi.cafs.uplb.edu.ph/soil-test-kit/"
          target="_blank"
          className="hover:underline"
        >
          UPLB-ASI Soil Test Kit
        </a>
        {"."}
      </Text>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 w-full">
          <Text type="label" weight="bold">Nitrogen</Text>
          <div className="flex gap-2 text-white">
            <Button className="bg-[#A15C1B] w-full">
              <Text size="base">Low</Text>
            </Button>
            <Button className="bg-[#676F2B] w-full">
              <Text size="base">Medium</Text>
            </Button>
            <Button className="bg-[#2C6927] w-full">
              <Text size="base">High</Text>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text type="label" weight="bold">Phosphorus</Text>
          <div className="flex gap-2 text-white">
            <Button className="bg-[#B7C2C4] w-full">
              <Text size="base">Low</Text>
            </Button>
            <Button className="bg-[#4d649a] w-full">
              <Text size="base">Medium</Text>
            </Button>
            <Button className="bg-[#161B43] w-full">
              <Text size="base">High</Text>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text type="label" weight="bold">Potassium</Text>
          <div className="flex gap-2 text-white">
            <Button className="bg-[#D5D3CA] w-full">
              <Text size="base">Low</Text>
            </Button>
            <Button className="bg-[#CDB779] w-full">
              <Text size="base">Medium</Text>
            </Button>
            <Button className="bg-[#B45A1D] w-full">
              <Text size="base">High</Text>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text type="label" weight="bold">pH Level</Text>
          <div className="flex flex-col gap-2">
            <Text>BTB</Text>
            <div className="flex gap-2 text-white">
              <Button className="bg-[#9E842F] w-full">
                <Text>6.0</Text>
              </Button>
              <Button className="bg-[#726D27] w-full">
                <Text>6.4</Text>
              </Button>
              <Button className="bg-[#1F381A] w-full">
                <Text>6.8</Text>
              </Button>
              <Button className="bg-[#253E22] w-full">
                <Text>7.2</Text>
              </Button>
              <Button className="bg-[#1D3355] w-full">
                <Text>{"> 7.2"}</Text>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Text>CPR</Text>
            <div className="flex gap-2 text-white">
              <Button className="bg-[#B67E27] w-full">
                <Text>5.0</Text>
              </Button>
              <Button className="bg-[#852716] w-full">
                <Text>5.4</Text>
              </Button>
              <Button className="bg-[#6D2319] w-full">
                <Text>5.8</Text>
              </Button>
              <Button className="bg-[#592332] w-full">
                <Text>6.0</Text>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Text>BCG</Text>
            <div className="flex gap-2 text-white">
              <Button className="bg-[#BD882E] w-full">
                <Text>{"< 4.0"}</Text>
              </Button>
              <Button className="bg-[#40643E] w-full">
                <Text>4.0</Text>
              </Button>
              <Button className="bg-[#325145] w-full">
                <Text>4.4</Text>
              </Button>
              <Button className="bg-[#25284E] w-full">
                <Text>4.8</Text>
              </Button>
              <Button className="bg-[#182047] w-full">
                <Text>5.2</Text>  
              </Button>
            </div>
          </div>
        </div>
      </div>
      
    </Widget>
  )
}
