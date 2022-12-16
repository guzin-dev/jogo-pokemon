import { Route, Routes } from "react-router-dom";
import NewGame from "./components/NewGame";
import Battle from "./components/Battle";
import Win from "./components/Win";
import Loss from "./components/Loss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NewGame />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/win" element={<Win />} />
        <Route path="/loss" element={<Loss />} />
      </Routes>
    </>
  );
}

export default App;
