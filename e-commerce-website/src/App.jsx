import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import "./App.css";
import Hero from "./components/Hero";
import Features from "./components/Features";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Menu />
        <Hero />
        <Features/>
      </div>
    </Router>
  );
}

export default App;
