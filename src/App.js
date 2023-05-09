import "./App.css";
import { useState } from "react";
import Logo from "./Logo.jsx";
import TestImages from "./TestImages";
import TrainedImages from "./TrainedImages/TrainedImages";

function App() {
  const [currTab, setCurrTab] = useState(0);

  return (
    <div className="App">
      <header className="Header">
        <Logo />
        <div className="Header_NavContainer">
          <span
            className={"Header_NavItem " + (currTab === 0 ? "active" : "")}
            onClick={() => setCurrTab(0)}
          >
            Train
          </span>
          <span
            className={"Header_NavItem " + (currTab === 1 ? "active" : "")}
            onClick={() => setCurrTab(1)}
          >
            Test
          </span>
        </div>
      </header>

      <main className="Content">
        {currTab === 0 ? <TrainedImages /> : <TestImages />}
      </main>
    </div>
  );
}

export default App;
