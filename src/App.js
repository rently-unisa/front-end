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
import AreaPersonale from "./components/AreaPersonale";
import LeMieRichieste from "./components/LeMieRichieste";
import IMieiNoleggi from "./components/IMieiNoleggi";
import IMieiAnnunci from "./components/IMieiAnnunci";
import CreaAnnuncio from "./components/CreaAnnuncio";
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
          <Route path="/profilo" element={<AreaPersonale />} />
          <Route path="/richieste/:checked" element={<LeMieRichieste />} />
          <Route path="/richieste" element={<LeMieRichieste />} />
          <Route path="/noleggi/:checked" element={<IMieiNoleggi />} />
          <Route path="/noleggi" element={<IMieiNoleggi />} />
          <Route path="/annunci" element={<IMieiAnnunci />} />
          <Route path="/creaUnAnnuncio" element={<CreaAnnuncio />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
