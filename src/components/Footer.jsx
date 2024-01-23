import React, { useEffect, useState } from "react";
import logoNonDaltonici from "../image/Logo.png";
import logoDaltonici from "../image/RentlyFinaleDaltonici.png";
import insta from "../image/Instagram.png";
import "../style/Footer.css";
import "../style/App.css";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Footer = () => {
  const { isLoggedIn, toggleDaltonico, daltonico } = useAuth();
  const [logo, setLogo] = useState(logoNonDaltonici);

  const userLink = isLoggedIn ? (
    <Link to="/profilo">
      <div className="info-link">Area Personale</div>
    </Link>
  ) : (
    <Link to="/login">
      <div className="info-link">Area Personale</div>
    </Link>
  );

  const handleFontChange = () => {
    const body = document.body;
    body.classList.toggle("openDyslexic");
  };

  const handleColorChange = () => {
    const body = document.body;
    body.classList.toggle("blue");
    toggleDaltonico();
  };

  useEffect(() => {
    setLogo(daltonico ? logoDaltonici : logoNonDaltonici);
  }, [daltonico]);

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
      <div className="info-box-servizi">
        <div className="info-header">Servizi</div>
        {userLink}
        <Link to="/assistenza">
          <div className="info-link">Assistenza</div>
        </Link>
        <Link to="/catalogo">
          <div className="info-link">Catalogo</div>
        </Link>
        <Link to="/">
          <div className="info-link">Home</div>
        </Link>
      </div>
      <div className="info-box">
        <div className="info-header">Accessibilità</div>
        <button
          style={{ fontFamily: "OpenDyslexic", fontSize: "0.725rem" }}
          onClick={handleFontChange}
          className="accessibility-link"
        >
          Cambia font
        </button>
        <button onClick={handleColorChange} className="accessibility-link">
          Cambia palette
        </button>
      </div>
    </div>
  );
};

export default Footer;
