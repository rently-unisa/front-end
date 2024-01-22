import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getUserByEmailAndPassword } from "../services/utenti";
import logoNonDaltonici from "../image/Logo.png";
import logoDaltonici from "../image/RentlyFinaleDaltonici.png";
import "../style/Login.css";
import image1 from "../image/ondinaprova1.svg";
import image2 from "../image/ondinaprova2.svg";
import image3 from "../image/ondadoppia1.svg";
import image4 from "../image/ondadoppia2.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, daltonico } = useAuth();
  const navigate = useNavigate();
  const [logo, setLogo] = useState(logoNonDaltonici);

  useEffect(() => {
    setLogo(daltonico ? logoDaltonici : logoNonDaltonici);
  }, [daltonico]);

  const handleLogin = () => {
    getUserByEmailAndPassword(username, password).then((response) => {
      if (response.ok) {
        response.json().then((newUser) => {
          if (newUser) {
            login(newUser);
            navigate("/");
          } else {
            alert("Errore durante la richiesta del profilo utente");
          }
        });
      } else {
        response.json().then((result) => {
          alert(result.message);
        });
      }
    });
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
          <p>Email</p>
          <input
            type="text"
            value={username}
            placeholder="Inserisci la tua email"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="parametro">
          <p>Password</p>
          <input
            type="password"
            value={password}
            placeholder="Inserisci la tua password"
            onChange={(e) => setPassword(e.target.value)}
            required
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
