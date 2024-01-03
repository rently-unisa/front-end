import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { addUser } from "../services/utenti";
import logo from "../image/Logo.png";
import "../style/Login.css";

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
      <div className="box">
        <div className="image-box">
          <div className="titolo">Registrati a </div>
          <div className="Logo-box">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="brand-name">ently</div>
          </div>
        </div>
        <div className="parametro">
          Nome
          <input
            type="text"
            value={nome}
            placeholder="Inserisci il tuo nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="parametro">
          Cognome
          <input
            type="text"
            value={cognome}
            placeholder="Inserisci il tuo cognome"
            onChange={(e) => setCognome(e.target.value)}
          />
        </div>
        <div className="parametro">
          Username
          <input
            type="text"
            value={username}
            placeholder="Inserisci il tuo username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="parametro">
          Email
          <input
            type="email"
            value={email}
            placeholder="Inserisci la tua email"
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="parametro">
          Conferma Password
          <input
            type="password"
            value={confPassword}
            placeholder="Conferma la tua password"
            onChange={(e) => setConfPassword(e.target.value)}
          />
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
    </div>
  );
};

export default Signup;
