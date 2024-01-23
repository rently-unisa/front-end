import React from "react";
import "@fontsource/opendyslexic";
import "@fontsource/fredoka";
import "@fontsource/fredoka-one";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Catalogo from "./components/Catalogo";
import Dettagli from "./components/Dettagli";
import ChiSiamo from "./components/ChiSiamo";
import Assistenza from "./components/Assistenza";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AreaPersonale from "./components/AreaPersonale";
import LeMieRichieste from "./components/LeMieRichieste";
import IMieiNoleggi from "./components/IMieiNoleggi";
import IMieiAnnunci from "./components/IMieiAnnunci";
import CreaAnnuncio from "./components/CreaAnnuncio";
import ModificaAnnuncio from "./components/ModificaAnnuncio";
import ProfiloUtente from "./components/ProfiloUtente";
import PaginaErrore from "./components/PaginaErrore";
import "./style/App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/catalogo/:search" element={<Catalogo />} />
          <Route path="/dettagli/:id" element={<Dettagli />} />
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
          <Route path="/modificaAnnuncio/:id" element={<ModificaAnnuncio />} />
          <Route path="/utente/:id" element={<ProfiloUtente />} />
          <Route path="/forbidden" element={<PaginaErrore errorCode={403} />} />
          <Route path="*" element={<PaginaErrore errorCode={404} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
