import React from "react";
import logo from "./image/Logo.png";
import insta from "./image/Instagram.png";
import "./style/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="info-box">
        <div className="logo-container">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="brand-name">ently</div>
        </div>
        <div className="info">© 2024 Rently. All rights reserved.</div>
        <div className="info">Privacy Policy</div>
        <div className="info">Terms of Service</div>
      </div>
      <div className="info-box">
        <div className="info-header">Informazioni di contatto</div>
        <div className="info">
          Rently - GlobalTrade Connect S.R.L.
          <br />
          Via delle Stelle, 77 - 20121 Milano, Italia
        </div>
        <div className="info-link">
          <Link to="/chi-siamo">Chi Siamo</Link>
        </div>
        <div className="social">
          <div className="social-info">Social:</div>
          <img src={insta} alt="Social Icon" />
        </div>
      </div>
      <div className="info-box">
        <div className="info-header">Servizi</div>
        <div className="info-link">Profilo utente</div>
        <div className="info-link">Assistenza</div>
        <div className="info-link">Catalogo</div>
        <div className="info-link">Home</div>
      </div>
      <div className="info-box">
        <div className="info-header">Accessibilità</div>
        <div className="accessibility-item">
          <button
            style={{ fontFamily: "OpenDyslexic" }}
            className="accessibility-link"
          >
            Cambia font
          </button>
        </div>
        <div className="accessibility-item">
          <button className="accessibility-link">Cambia palette</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
