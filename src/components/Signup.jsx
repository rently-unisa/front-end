import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { addUser } from "../services/utenti";
import logoNonDaltonici from "../image/Logo.png";
import logoDaltonici from "../image/RentlyFinaleDaltonici.png";
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
  const [logo, setLogo] = useState(logoNonDaltonici);
  const { login, daltonico } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLogo(daltonico ? logoDaltonici : logoNonDaltonici);
  }, [daltonico]);

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
      addUser(newUser).then((response) => {
        try {
          if (response.ok) {
            response.json().then((newUser) => {
              if (newUser) {
                login(newUser);
                navigate("/");
              } else {
                alert("Credenziali non valide");
              }
            });
          } else {
            const errorMessage = response.text();
            throw new Error(
              errorMessage || "Errore sconosciuto durante la registrazione"
            );
          }
        } catch (error) {
          alert("Errore durante la richiesta di registrazione", error.message);
        }
      });
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
            <p>Nome</p>
            <input
              type="text"
              value={nome}
              placeholder="Inserisci il tuo nome"
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="parametro1">
            <p>Cognome</p>
            <input
              type="text"
              value={cognome}
              placeholder="Inserisci il tuo cognome"
              onChange={(e) => setCognome(e.target.value)}
              required
            />
          </div>
          <div className="parametro1">
            <p>Username</p>
            <input
              type="text"
              value={username}
              placeholder="Inserisci il tuo username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="parametro1">
            <p>Email</p>
            <input
              type="email"
              value={email}
              placeholder="Inserisci la tua email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="parametro1">
            <p>Password</p>
            <input
              type="password"
              value={password}
              placeholder="Inserisci la tua password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="parametro1">
            <p>Conferma Password</p>
            <input
              type="password"
              value={confPassword}
              placeholder="Conferma la tua password"
              onChange={(e) => setConfPassword(e.target.value)}
              required
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
      <img className="bottoml" src={image2} alt="Immagine decorativa" />
    </div>
  );
};

export default Signup;
