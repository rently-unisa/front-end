import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import dayjs from "dayjs";
import { useAuth } from "../AuthContext";
import RichiestaNoleggio from "./RichiestaNoleggio";
import { getAdById } from "../services/annunciNoleggio";
import { getUserById } from "../services/utenti";
import { getObjectValutationsByAnnuncioId } from "../services/valutazioneOggetto";
import { Alert, Box, Snackbar } from "@mui/material";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../style/Dettagli.css";
import Chat from "./Chat";
import Cookies from "js-cookie";
import { getMessagesByUsersId } from "../services/messaggi";

const Dettagli = () => {
  const idAnnuncio = parseInt(useParams().id, 10);
  const [Annuncio, setAnnuncio] = useState();
  const [adUser, setAdUser] = useState();
  const [ratings, setRatings] = useState();
  const [usernames, setUsernames] = useState({});
  const { isLoggedIn } = useAuth();
  const [popupVisible, setPopupVisible] = useState(false);
  const [chatParams, setChatParams] = useState({
    idEmittente: null,
    idRicevente: null,
  });
  const [chatVisibility, setChatVisibility] = useState(false);
  const [alertState, setAlertState] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const hendleAlert = (state, message) => {
    setAlertState(state);
    setAlertMessage(message);
    handleClick({ vertical: "top", horizontal: "center" });
  };

  const handleOpenChat = (idEmittente, idRicevente) => {
    getMessagesByUsersId(idEmittente, idRicevente).then((response) => {
      if (response.ok) {
        response.json().then((messages) => {
          setChatParams({ idEmittente, idRicevente, messages });
        });
      }
    });
    setChatVisibility(true);
  };

  const getRatingUsername = async (id) => {
    try {
      const response = await getUserById(id);
      if (response.ok) {
        const user = await response.json();
        return { id, username: user.username };
      } else {
        const result = await response.json();
        return { id, username: "Utente sconosciuto" };
      }
    } catch (error) {
      return { id, username: "Utente sconosciuto" };
    }
  };

  useEffect(() => {
    const fetchAd = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      getAdById(idAnnuncio).then((response) => {
        if (response.ok) {
          response.json().then((ad) => {
            fetchUser(ad.idUtente);
            fetchRatings(ad.id);
            setAnnuncio(ad);
          });
        } else {
          response.json().then((result) => {
            hendleAlert("error", result.message);
          });
        }
      });
    };

    const fetchUser = async (idAdUtente) => {
      getUserById(idAdUtente).then((response) => {
        if (response.ok) {
          response.json().then((utente) => {
            setAdUser(utente);
          });
        } else {
          response.json().then((result) => {
            hendleAlert("error", result.message);
          });
        }
      });
    };

    const fetchRatings = async (id) => {
      getObjectValutationsByAnnuncioId(id).then((response) => {
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
          response.json().then((result) => {
            hendleAlert("error", result.message);
          });
        }
      });
    };

    fetchAd();
  }, [idAnnuncio]);

  return (
    <div className="Page">
      <Navbar />
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertState}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
      {Annuncio && adUser && ratings ? (
        <>
          <div className="container">
            <div className="title">{Annuncio.titolo}</div>
            <div className="detailsContainer">
              <div className="leftSection">
                <div className="adDescription">
                  <p>{Annuncio.descrizione}</p>
                  <label>
                    <p style={{ textAlign: "left" }}>
                      <span>Data di fine disponibilità: </span>
                      {Annuncio.dataFine}
                    </p>
                    <p style={{ textAlign: "left" }}>
                      <span>Condizioni: </span>
                      {Annuncio.condizione}
                    </p>
                  </label>
                </div>
                <div className="actionButtons">
                  <div className="requestButton">
                    {dayjs().isAfter(Annuncio.dataFine, "day") ? (
                      <button>Annuncio scaduto</button>
                    ) : (
                      <button
                        onClick={() => {
                          if (
                            isLoggedIn &&
                            Cookies.get("id") !== adUser.id.toString()
                          ) {
                            setPopupVisible(true);
                          } else if (!isLoggedIn) {
                            hendleAlert(
                              "error",
                              "Fare l'accesso per poter fare una richiesta di noleggio"
                            );
                          } else {
                            hendleAlert(
                              "error",
                              "Impossibile noleggiare un proprio oggetto"
                            );
                          }
                        }}
                      >
                        Richiedi il noleggio
                      </button>
                    )}
                  </div>
                  <div className="contact">
                    <div className="contactUser">
                      <AccountCircleIcon
                        fontSize="large"
                        className="contactIcon"
                      />
                      <Link to={`/utente/${adUser.id}`}>{adUser.username}</Link>
                    </div>
                    <div className="contactButton">
                      <button
                        className="contactButton2"
                        onClick={() => {
                          if (
                            isLoggedIn &&
                            Cookies.get("id") !== adUser.id.toString()
                          ) {
                            handleOpenChat(Cookies.get("id"), adUser.id);
                          } else if (!isLoggedIn) {
                            hendleAlert(
                              "error",
                              "Fare l'accesso per poter avviare una conversazione"
                            );
                          } else {
                            hendleAlert(
                              "error",
                              "Impossibile creare una chat con se stessi"
                            );
                          }
                        }}
                      >
                        Contatta
                      </button>
                      <Chat
                        trigger={chatVisibility}
                        setTrigger={setChatVisibility}
                        idEmittente={chatParams.idEmittente}
                        idRicevente={chatParams.idRicevente}
                        messages={chatParams.messages}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="imageContainer">
                <img
                  src={Annuncio.immagine}
                  alt={`Immagine di ${Annuncio.titolo}`}
                />
              </div>
            </div>
            <div className="reviewsContainer">
              <div className="reviewsTitle">Recensioni sull'articolo</div>
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
                        : ratings.reduce(
                            (sum, rating) => sum + rating.voto,
                            0
                          ) /
                          (ratings.length * 2)}
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
                        {usernames[rating.valutatore]}
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
          {popupVisible && (
            <RichiestaNoleggio
              idAnnuncio={idAnnuncio}
              idCreatore={Annuncio.idUtente}
              prezzoAnnuncio={Annuncio.prezzo}
              dataFinale={Annuncio.dataFine}
              onClose={() => setPopupVisible(false)}
            />
          )}
        </>
      ) : (
        <div className="Loading">
          <Loader />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dettagli;
