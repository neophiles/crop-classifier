import { useState } from "react";
import Header from "./components/layout/Header";
import InputContainer, { type PredictionResult } from "./components/input/InputContainer";
import Main from "./components/layout/Main";
import OutputContainer from "./components/output/OutputContainer";

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
