/*
import image3 from "../image/onda2nuovo1.svg";
import image4 from "../image/onda2nuovo2.svg";*/
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getUserById, modifyUser } from "../services/utenti";
import { Link } from "react-router-dom";
import "../style/AreaPersonale.css";

const AreaPersonale = () => {
  const idUsername = Cookies.get("id");
  const [user, setUser] = useState();
  const [id, setId] = useState("");
  const [premium, setPremium] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [userUsername, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  useEffect(() => {
    getUserById(idUsername).then((response) => {
      if (response.ok) {
        response.json().then((utente) => setUser(utente));
      } else {
        response.json().then((result) => {
          alert(result.message);
        });
      }
    });
  }, [idUsername]);

  useEffect(() => {
    if (user) {
      const { id, premium, nome, cognome, email, username } = user;
      setId(id);
      setPremium(premium);
      setNome(nome);
      setCognome(cognome);
      setEmail(email);
      setUsername(username);
    }
  }, [user]);

  const handleModify = (subscribe) => {
    let username = userUsername;
    const newUserData = {
      id,
      nome,
      cognome,
      email,
      username,
      nuovaPassword: newPassword,
      confermaNuovaPassword: confPassword,
      premium: subscribe,
    };

    modifyUser(newUserData).then((response) => {
      if (response.ok) {
        response.json().then((utente) => setUser(utente));
      } else {
        response.json().then((result) => {
          alert(result.message);
        });
      }
    });
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
                  <p>Password</p>
                  <input
                    className="input"
                    type="password"
                    value={newPassword}
                    placeholder="Inserisci la tua nuova password"
                    onChange={(e) => setNewPassword(e.target.value)}
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
