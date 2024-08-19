import "./App.css";

import NavComp from "./Components/NavComp";
import Routing from "./Components/Routing";

function App() {
  return (
    <div className="w-full">
      <div className="fixed w-full">
        <NavComp />
      </div>
      <div className="pt-10 w-full h-full bg-neutral-800 md:py-16 py-20 md:pl-16 pl-12 ">
        <Routing />
      </div>
    </div>
  );
}

export default App;
