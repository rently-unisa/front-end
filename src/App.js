import React from "react";
import "@fontsource/opendyslexic";
import "@fontsource/fredoka";
import "@fontsource/fredokaone";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Annunci from "./Annunci";
import ChiSiamo from "./ChiSiamo";
import Segnalazione from "./Segnalazione";
import Login from "./Login";
import "./style/App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/annunci" element={<Annunci />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/segnalazione" element={<Segnalazione />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
