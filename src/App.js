import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routess from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routess />
      </div>
    </BrowserRouter>
  );
}

export default App;
