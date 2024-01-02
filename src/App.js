import React from "react";
import "@fontsource/opendyslexic";
import "@fontsource/fredoka";
import "@fontsource/fredokaone";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Annunci from "./components/Annunci";
import ChiSiamo from "./components/ChiSiamo";
import Assistenza from "./components/Assistenza";
import Login from "./components/Login";
import "./style/App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annunci" element={<Annunci />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/assistenza" element={<Assistenza />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
