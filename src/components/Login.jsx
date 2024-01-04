import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getUserByUsernameAndPassword } from "../services/utenti";
import { getUserByEmailAndPassword } from "../services/utenti";
import logo from "../image/Logo.png";
import "../style/Login.css";
import image1 from "../image/ondinaprova1.svg";
import image2 from "../image/ondinaprova2.svg";
import image3 from "../image/ondadoppia1.svg";
import image4 from "../image/ondadoppia2.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    var user = getUserByUsernameAndPassword(username, password);
    if (user) {
      login(user);
      navigate("/");
    } else {
      user = getUserByEmailAndPassword(username, password);
      if (user) {
        login(user);
        navigate("/");
      } else {
        alert("Credenziali non valide");
      }
    }
  };

  return (
    <div style={{ justifyContent: "center" }} className="Page">
      <img className="top" src={image4} alt="Immagine decorativa" />
      <div className="box">
        <div className="image-box">
          <img className="right" src={image1} alt="Immagine decorativa" />
          <img className="left" src={image2} alt="Immagine decorativa" />
          <div className="Logo-box">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="brand-name">ently</div>
          </div>
        </div>
        <div className="titolo">Accedi</div>
        <div className="parametro">
          Email / Username
          <input
            type="text"
            value={username}
            placeholder="Inserisci la tua email oppure il tuo username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="parametro">
          Password
          <input
            type="password"
            value={password}
            placeholder="Inserisci la tua password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="pulsante" onClick={handleLogin}>
          Accedi
        </button>
        <div className="opzioni">
          <p>
            Non hai ancora un account? <Link to="/signup">Registrati</Link>
          </p>
          <p>
            Torna alla <Link to="/">home</Link>
          </p>
        </div>
      </div>
      <img className="bottom" src={image3} alt="Immagine decorativa" />
    </div>
  );
};

export default Login;
