import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <Hero />
    </div>
  );
}

export default App;
