import { Poc } from "@spendit/table";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Spendit table</h1>
      <div className="card">
        <Poc>Hello</Poc>
      </div>
    </div>
  );
}

export default App;
