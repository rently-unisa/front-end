/*
import image3 from "../image/onda2nuovo1.svg";
import image4 from "../image/onda2nuovo2.svg";*/
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../AuthContext";
import { getUserById, modifyUser } from "../services/utenti";
import { Link } from "react-router-dom";
import "../style/AreaPersonale.css";

const AreaPersonale = () => {
  const { idUsername } = useAuth();
  const [user, setUser] = useState();
  getUserById(idUsername).then((response) => {
    try {
      if (response.ok) {
        response.json().then((utente) => setUser(utente));
      } else {
        const errorMessage = response.text();
        throw new Error(
          errorMessage ||
            "Errore sconosciuto durante il recupero del profilo utente"
        );
      }
    } catch (error) {
      console.error(
        "Errore durante la richiesta del profilo utente:",
        error.message
      );
    }
  });

  useEffect(() => {
    if (user) {
      const { id, premium, password, nome, cognome, email, username } = user;
      setId(id);
      setPremium(premium);
      setActPassword(password);
      setNome(nome);
      setCognome(cognome);
      setEmail(email);
      setUsername(username);
    }
  }, [user]);

  const [id, setId] = useState("");
  const [premium, setPremium] = useState("");
  const [actPassword, setActPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [userUsername, setUsername] = useState("");
  const [newPassword, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleModify = (subscribe) => {
    let password = "";
    if (
      newPassword !== "" &&
      confPassword !== "" &&
      newPassword === confPassword
    ) {
      password = newPassword;
    } else password = actPassword;

    let username = userUsername;
    const newUserData = {
      id,
      nome,
      cognome,
      email,
      username,
      password,
      premium: subscribe,
    };
    modifyUser(newUserData);

    setPassword("");
    setConfPassword("");
    setActPassword(password);
  };

  const handleSubscribe = () => {
    setPremium((prevPremium) => !prevPremium);
    handleModify(!premium);
  };

  const subscribeMenu = premium ? (
    <div className="subscribeContainer">
      <p className="paragraph">
        Sei già abbonato a Rently ma puoi disdire in qualsiasi momento
      </p>
      <button className="pulsante" onClick={handleSubscribe}>
        Disdici
      </button>
    </div>
  ) : (
    <div className="subscribeContainer">
      <p className="paragraph">
        Abbonati a Rently per avere i tuoi annunci sponsorizzati con un alto
        grado di priorità
      </p>
      <button className="pulsante" onClick={handleSubscribe}>
        Abbonati
      </button>
    </div>
  );

  return (
    <div className="Page">
      <Navbar />
      <div className="container">
        <h1 className="titolo">Area Personale</h1>
        <div className="areaPersonaleContainer">
          <div className="linkContainer">
            <h2 className="titolo2">Ciao {userUsername}</h2>
            <h4 className="titolo4">Scopri cosa puoi fare su Rently</h4>
            <div className="divider"></div>
            <div>
              <div className="link">
                <Link to="/richieste">Le mie richieste</Link>
              </div>
              <div className="link">
                <Link to="/noleggi">I miei Noleggi</Link>
              </div>
              <div className="link">
                <Link to="/annunci">I miei Annunci</Link>
              </div>
              <div className="link">
                <Link to="/creaUnAnnuncio">Crea un annuncio</Link>
              </div>
              <div className="link">
                <Link to="/">Torna alla home</Link>
              </div>
              <div className="link">
                <Link to="/catalogo">Vai al catalogo</Link>
              </div>
            </div>
            <div className="divider"></div>
            {subscribeMenu}
          </div>
          <div className="dati">
            <h3 className="titolo3">I tuoi dati</h3>
            <div className="parametriContainer">
              <div className="parametri">
                <div className="parametro1">
                  <p>Nome</p>
                  <input
                    className="input"
                    type="text"
                    value={nome}
                    placeholder="Inserisci il tuo nome"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="parametro1">
                  <p>Cognome</p>
                  <input
                    className="input"
                    type="text"
                    value={cognome}
                    placeholder="Inserisci il tuo cognome"
                    onChange={(e) => setCognome(e.target.value)}
                  />
                </div>
                <div className="parametro1">
                  <p>Username</p>
                  <input
                    className="input"
                    type="text"
                    value={userUsername}
                    placeholder="Inserisci il tuo username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="parametri">
                <div className="parametro1">
                  <p>Email</p>
                  <input
                    className="input"
                    type="email"
                    value={email}
                    placeholder="Inserisci la tua email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="parametro1">
                  <p>Vecchia Password</p>
                  <input
                    className="input"
                    type="password"
                    value={actPassword}
                    readOnly
                  />
                </div>
                <div className="parametro1">
                  <p>Password</p>
                  <input
                    className="input"
                    type="password"
                    value={newPassword}
                    placeholder="Inserisci la tua password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="parametro1">
                  <p>Conferma Password</p>
                  <input
                    className="input"
                    type="password"
                    value={confPassword}
                    placeholder="Conferma la tua password"
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button className="pulsante" onClick={() => handleModify(premium)}>
              Applica modifiche
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AreaPersonale;
