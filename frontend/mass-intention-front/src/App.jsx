import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import SchedulePage from "./components/SchedulePage";

function App() {
  return (
    <div className="flex flex-col">
      <NavBar />
      {/* <HomePage /> */}
      <SchedulePage/>
    </div>
  );
}

export default App;
