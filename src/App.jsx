import { BrowserRouter } from "react-router-dom";
import "./App.css";
import BaseRoute from "./apps/BaseRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <BaseRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
