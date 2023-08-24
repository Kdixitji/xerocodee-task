import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Service from "./Components/Service";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </>
  );
}

export default App;
