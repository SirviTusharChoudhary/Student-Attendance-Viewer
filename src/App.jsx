import HomePage from "./components/HomePage";
import Report from "./components/Report";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [year, setYear] = useState(1);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage yearDetail={{ year, setYear }} />}/>
          <Route path="/report" element={<Report year={year} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
