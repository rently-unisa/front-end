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
import { getUserValutationsByValutatoId } from "../services/valutazioneUtente";

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
  const [ratings, setRatings] = useState();
  const [usernames, setUsernames] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      getUserById(idUsername).then((response) => {
        if (response.ok) {
          response.json().then((utente) => {
            fetchRating(idUsername);
            setUser(utente);
          });
        } else {
          response.json().then((result) => {
            alert(result.message);
          });
        }
      });
    };

    const fetchRating = async (id) => {
      getUserValutationsByValutatoId(id).then((response) => {
        if (response.ok) {
          response.json().then((adRatings) => {
            setRatings(adRatings);
            adRatings.forEach((rating) => {
              getUserById(rating.idValutatore).then((response) => {
                if (response.ok) {
                  response
                    .json()
                    .then((utente) => nicknames.push(utente.username));
                } else {
                  response.json().then((result) => {
                    alert(result.message);
                  });
                }
              });
            });

            setUsernames(nicknames);
          });
        } else {
          response.json().then((result) => {
            alert(result.message);
          });
        }
      });
    };

    fetchUser();
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
          <div className="reviewsContainer">
            <div className="reviewsTitle">Recensioni sull'utente</div>
            <div className="reviewsContainer1">
              <div className="reviewsStats">
                <div className="reviewsNumber">
                  {ratings.length < 2
                    ? `${ratings.length} review`
                    : `${ratings.length} reviews`}
                </div>
                <div className="overallRating">Overall rating</div>
                <div className="ratingMedium">
                  <div className="averageRating">
                    {ratings.reduce((sum, rating) => sum + rating.voto, 0) /
                      (ratings.length * 2) ===
                    0
                      ? "Nessuna recensione"
                      : ratings.reduce((sum, rating) => sum + rating.voto, 0) /
                        (ratings.length * 2)}
                  </div>
                  <div className="ratingStars">
                    <Rating
                      name="read-only"
                      style={{ color: "#282a28" }}
                      value={
                        ratings.reduce((sum, rating) => sum + rating.voto, 0) /
                        (ratings.length * 2)
                      }
                      precision={0.5}
                      readOnly
                    />
                  </div>
                </div>
                <Box sx={{ width: 150 }}>
                  <div className="SliderBox">
                    <span className="RatingNumber">5</span>{" "}
                    <Slider
                      defaultValue={ratings.reduce(
                        (count, rating) =>
                          rating.voto >= 9 ? count + 1 : count + 0,
                        0
                      )}
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          rating.voto >= 9 ? count + 1 : count + 0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="SliderBox">
                    <span className="RatingNumber">4</span>{" "}
                    <Slider
                      defaultValue={ratings.reduce(
                        (count, rating) =>
                          7 <= rating.voto && rating.voto < 9
                            ? count + 1
                            : count + 0,
                        0
                      )}
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          7 <= rating.voto && rating.voto < 9
                            ? count + 1
                            : count + 0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="SliderBox">
                    <span className="RatingNumber">3</span>{" "}
                    <Slider
                      defaultValue={ratings.reduce(
                        (count, rating) =>
                          5 <= rating.voto && rating.voto < 7
                            ? count + 1
                            : count + 0,
                        0
                      )}
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          5 <= rating.voto && rating.voto < 7
                            ? count + 1
                            : count + 0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="SliderBox">
                    <span className="RatingNumber">2</span>{" "}
                    <Slider
                      defaultValue={ratings.reduce(
                        (count, rating) =>
                          3 <= rating.voto && rating.voto < 5
                            ? count + 1
                            : count + 0,
                        0
                      )}
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          3 <= rating.voto && rating.voto < 5
                            ? count + 1
                            : count + 0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="SliderBox">
                    <span className="RatingNumber">1</span>{" "}
                    <Slider
                      defaultValue={ratings.reduce(
                        (count, rating) =>
                          1 <= rating.voto && rating.voto < 3
                            ? count + 1
                            : count + 0,
                        0
                      )}
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          1 <= rating.voto && rating.voto < 3
                            ? count + 1
                            : count + 0,
                        0
                      )}
                    </span>
                  </div>
                </Box>
              </div>
              <div className="userReviews">
                {ratings.map((rating) => (
                  <div key={rating.id} className="containerUserReviews">
                    <div className="usernameUserReviews">
                      {
                        usernames.find(
                          (user) => user.id === rating.idValutatore
                        )?.username
                      }
                    </div>
                    <div className="iconsUserReviews">
                      <Rating
                        name="read-only"
                        style={{ color: "#282a28", fontSize: "1.2rem" }}
                        value={rating.voto / 2}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <div className="review-textUserReviews">
                      {rating.descrizione}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AreaPersonale;
