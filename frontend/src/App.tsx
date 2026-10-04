import Header from "./components-v2/layout/Header";
import InputContainer from "./components-v2/input/InputContainer";
import Main from "./components-v2/layout/Main";
import OutputContainer from "./components-v2/output/OutputContainer";

export default function App() {
  return (
    <div className="w-full sm:h-screen md:min-h-screen flex-1 flex flex-col items-center">
      <Header />
      <Main>
        <InputContainer />
        <hr className="text-gray-300 border-2 md:hidden" />
        <OutputContainer />
      </Main>
    </div>
  )
}
