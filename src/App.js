import React from "react";
import "@fontsource/opendyslexic";
import "@fontsource/fredoka";
import "@fontsource/fredoka-one";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Catalogo from "./components/Catalogo";
import ChiSiamo from "./components/ChiSiamo";
import Assistenza from "./components/Assistenza";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./style/App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/assistenza" element={<Assistenza />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
