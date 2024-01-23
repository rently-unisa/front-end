import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getUserById, modifyUser } from "../services/utenti";
import { Link, useNavigate } from "react-router-dom";
import "../style/AreaPersonale.css";
import { getUserValutationsByValutatoId } from "../services/valutazioneUtente";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const getRatingUsername = async (id) => {
    try {
      const response = await getUserById(id);
      if (response.ok) {
        const user = await response.json();
        return { id, username: user.username };
      }
    } catch (error) {
      return { id, username: "Utente sconosciuto" };
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      getUserById(idUsername).then((response) => {
        if (response.ok) {
          response.json().then((utente) => {
            fetchRating(idUsername);
            setUser(utente);
          });
        } else {
          if (response.status === 403) navigate("/forbidden");
          else handleClick();
        }
      });
    };

    const fetchRating = async (id) => {
      getUserValutationsByValutatoId(id).then((response) => {
        if (response.ok) {
          response.json().then(async (adRatings) => {
            const userPromises = adRatings.map((rating) =>
              getRatingUsername(rating.valutatore)
            );
            const usersData = await Promise.all(userPromises);

            const newUsernameMapping = {};
            usersData.forEach((userData) => {
              newUsernameMapping[userData.id] = userData.username;
            });

            setRatings(adRatings);
            setUsernames(newUsernameMapping);
          });
        } else {
          handleClick();
        }
      });
    };

    fetchUser();
  }, [idUsername, navigate]);

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
        response.json().then(() => {
          handleClick();
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
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Problemi nella visualizzazione dell'area personale
          </Alert>
        </Snackbar>
      </Box>
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
        {ratings && (
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
                  {ratings.reduce((sum, rating) => sum + rating.voto, 0) /
                    (ratings.length * 2) >=
                  0 ? (
                    <div>
                      <div className="averageRating">
                        {ratings.reduce((sum, rating) => sum + rating.voto, 0) /
                          (ratings.length * 2) ===
                        0
                          ? "Nessuna recensione"
                          : (
                              ratings.reduce(
                                (sum, rating) => sum + rating.voto,
                                0
                              ) /
                              (ratings.length * 2)
                            ).toFixed(2)}
                      </div>
                      <div className="ratingStars">
                        <Rating
                          name="read-only"
                          style={{ color: "#282a28" }}
                          value={
                            ratings.reduce(
                              (sum, rating) => sum + rating.voto,
                              0
                            ) /
                            (ratings.length * 2)
                          }
                          precision={0.5}
                          readOnly
                        />
                      </div>
                    </div>
                  ) : (
                    "Nessuna recensione"
                  )}
                </div>
                <Box sx={{ width: 150 }}>
                  <div className="SliderBox">
                    <span className="RatingNumber">5</span>{" "}
                    <Slider
                      defaultValue={
                        ratings.reduce(
                          (count, rating) =>
                            rating.voto >= 9 ? count + 1 : count + 0,
                          0
                        ) >= 0
                          ? ratings.reduce(
                              (count, rating) =>
                                rating.voto >= 9 ? count + 1 : count + 0,
                              0
                            )
                          : 0
                      }
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
                      defaultValue={
                        ratings.reduce(
                          (count, rating) =>
                            rating.voto >= 7 && rating.voto < 9
                              ? count + 1
                              : count + 0,
                          0
                        ) >= 0
                          ? ratings.reduce(
                              (count, rating) =>
                                rating.voto >= 7 && rating.voto < 9
                                  ? count + 1
                                  : count + 0,
                              0
                            )
                          : 0
                      }
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          rating.voto >= 7 && rating.voto < 9
                            ? count + 1
                            : count + 0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="SliderBox">
                    <span className="RatingNumber">3</span>{" "}
                    <Slider
                      defaultValue={
                        ratings.reduce(
                          (count, rating) =>
                            rating.voto >= 5 && rating.voto < 7
                              ? count + 1
                              : count + 0,
                          0
                        ) >= 0
                          ? ratings.reduce(
                              (count, rating) =>
                                rating.voto >= 5 && rating.voto < 7
                                  ? count + 1
                                  : count + 0,
                              0
                            )
                          : 0
                      }
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          rating.voto >= 5 && rating.voto < 7
                            ? count + 1
                            : count + 0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="SliderBox">
                    <span className="RatingNumber">2</span>{" "}
                    <Slider
                      defaultValue={
                        ratings.reduce(
                          (count, rating) =>
                            rating.voto >= 3 && rating.voto < 5
                              ? count + 1
                              : count + 0,
                          0
                        ) >= 0
                          ? ratings.reduce(
                              (count, rating) =>
                                rating.voto >= 3 && rating.voto < 5
                                  ? count + 1
                                  : count + 0,
                              0
                            )
                          : 0
                      }
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          rating.voto >= 3 && rating.voto < 5
                            ? count + 1
                            : count + 0,
                        0
                      )}
                    </span>
                  </div>
                  <div className="SliderBox">
                    <span className="RatingNumber">1</span>{" "}
                    <Slider
                      defaultValue={
                        ratings.reduce(
                          (count, rating) =>
                            rating.voto >= 1 && rating.voto < 3
                              ? count + 1
                              : count + 0,
                          0
                        ) >= 0
                          ? ratings.reduce(
                              (count, rating) =>
                                rating.voto >= 1 && rating.voto < 3
                                  ? count + 1
                                  : count + 0,
                              0
                            )
                          : 0
                      }
                      max={ratings.length}
                      size="small"
                      disabled
                    />
                    <span className="RatingNumber">
                      {ratings.reduce(
                        (count, rating) =>
                          rating.voto >= 1 && rating.voto < 3
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
                      {usernames[rating.valutatore]}
                    </div>
                    <div className="iconsUserReviews">
                      <Rating
                        name="read-only"
                        style={{ color: "#282a28", fontSize: "1.2rem" }}
                        value={rating.voto / 2 > 0 ? rating.voto / 2 : 0}
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AreaPersonale;
