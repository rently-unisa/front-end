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
import Signup from "./components/Signup";
import AreaPersonale from "./components/AreaPersonale";
import "./style/App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Annunci />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/assistenza" element={<Assistenza />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profilo" element={<AreaPersonale />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
