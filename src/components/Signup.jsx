import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { addUser } from "../services/utenti";
import logo from "../image/Logo.png";
import image1 from "../image/ondina1.svg";
import image2 from "../image/onda3.svg";
import image3 from "../image/onda4.svg";
import "../style/Signup.css";

const Signup = () => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password === confPassword) {
      const newUser = {
        nome,
        cognome,
        email,
        username,
        password,
        premium: false,
      };
      const user = addUser(newUser);
      if (user) {
        login(user);
        navigate("/");
      } else {
        alert("Credenziali non valide");
      }
    } else {
      alert("Password non coincidenti");
    }
  };

  return (
    <div style={{ justifyContent: "center" }} className="Page">
      <img className="topr" src={image3} alt="Immagine decorativa" />
      <div className="box1">
        <div className="image-box1">
          <img src={image1} alt="Immagine decorativa" />
          <div className="titolo">Registrati a </div>
          <div className="Logo-box">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="brand-name">ently</div>
          </div>
          <img
            style={{ transform: "scaleX(-1)" }}
            src={image1}
            alt="Immagine decorativa"
          />
        </div>
        <div className="par">
          <p>
            Inizia subito a dare valore agli oggetti, risparmia e sii
            sostenibile con Rently:
          </p>{" "}
          <p>noleggio intelligente, guadagno costante.</p>
        </div>
        <div className="parametri">
          <div className="parametro1">
            Nome
            <input
              type="text"
              value={nome}
              placeholder="Inserisci il tuo nome"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="parametro1">
            Cognome
            <input
              type="text"
              value={cognome}
              placeholder="Inserisci il tuo cognome"
              onChange={(e) => setCognome(e.target.value)}
            />
          </div>
          <div className="parametro1">
            Username
            <input
              type="text"
              value={username}
              placeholder="Inserisci il tuo username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="parametro1">
            Email
            <input
              type="email"
              value={email}
              placeholder="Inserisci la tua email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="parametro1">
            Password
            <input
              type="password"
              value={password}
              placeholder="Inserisci la tua password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="parametro1">
            Conferma Password
            <input
              type="password"
              value={confPassword}
              placeholder="Conferma la tua password"
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="pulsante" onClick={handleSignup}>
          Registrati
        </button>
        <div className="opzioni">
          <p>
            Hai già un account? <Link to="/login">Accedi</Link>
          </p>
          <p>
            Torna alla <Link to="/">home</Link>
          </p>
        </div>
      </div>
      <img className="bottom" src={image2} alt="Immagine decorativa" />
    </div>
  );
};

export default Signup;
