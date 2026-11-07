import { useState } from "react";
import Header from "./components-v2/layout/Header";
import InputContainer, { type PredictionResult } from "./components-v2/input/InputContainer";
import Main from "./components-v2/layout/Main";
import OutputContainer from "./components-v2/output/OutputContainer";

export default function App() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)

  return (
    <div className="w-full sm:h-screen md:min-h-screen flex-1 flex flex-col items-center">
      <Header />
      <Main>
        <InputContainer onPrediction={setPrediction} />
        <hr className="text-gray-300 border-2 md:hidden" />
        <OutputContainer prediction={prediction} />
      </Main>
    </div>
  )
}
