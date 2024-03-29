import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/ProfiloUtente.css";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../services/utenti";
import { getAdsByUserId } from "../services/annunciNoleggio";
import { getUserValutationsByValutatoId } from "../services/valutazioneUtente";
import Loader from "./Loader";
import { Alert, Box, Snackbar } from "@mui/material";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Chat from "./Chat";
import Cookies from "js-cookie";
import { useAuth } from "../AuthContext";
import { getMessagesByUsersId } from "../services/messaggi";

const ProfiloUtente = () => {
  const { isLoggedIn } = useAuth();
  const userId = parseInt(useParams().id, 10);
  const [User, setUser] = useState();
  const [userAds, setUserAds] = useState();
  const [ratings, setRatings] = useState();
  const [usernames, setUsernames] = useState({});
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

  const handleAlert = (state, message) => {
    setAlertState(state);
    setAlertMessage(message);
    handleClick();
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
        return { id, username: "Utente sconosciuto" };
      }
    } catch (error) {
      return { id, username: "Utente sconosciuto" };
    }
  };

  useEffect(() => {
    const handleAlert = (state, message) => {
      setAlertState(state);
      setAlertMessage(message);
      handleClick();
    };

    const fetchUser = async () => {
      getUserById(userId).then((response) => {
        if (response.ok) {
          response.json().then((userData) => {
            fetchUserAds(userData.id);
            fetchRating(userData.id);
            setUser(userData);
          });
        } else {
          response.json().then((result) => {
            handleAlert("error", result.message);
          });
        }
      });
    };

    const fetchUserAds = async (id) => {
      await getAdsByUserId(id).then((response) => {
        if (response.ok) {
          response.json().then((ads) => {
            setUserAds(ads);
          });
        } else {
          response.json().then((result) => {
            handleAlert("error", result.message);
          });
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
          response.json().then((result) => {
            handleAlert("error", result.message);
          });
        }
      });
    };

    fetchUser();
  }, [userId]);

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
      {User && userAds && ratings ? (
        <div className="container">
          <h1>Profilo utente</h1>
          <div className="topSection">
            <div className="contactUserArea">
              <AccountCircleIcon fontSize="large" className="contactIcon" />
              <p>{User.username}</p>
              <p>{User.nome}</p>
              <p>{User.cognome}</p>
            </div>
            <div>
              <div>
                <button
                  className="contactUserButton"
                  onClick={() =>
                    isLoggedIn
                      ? handleOpenChat(Cookies.get("id"), userId)
                      : handleAlert(
                          "error",
                          "Fare l'accesso per poter fare una richiesta"
                        )
                  }
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
          <div className="listaAnnunciProfilo">
            {userAds.map((ad) => (
              <Link to={`/dettagli/${ad.id}`} key={ad.id}>
                <div className={`card `}>
                  <img
                    src={ad.immagine}
                    alt="Immagine annuncio"
                    loading="lazy"
                  />
                  <div className="card-description">
                    <p>{ad.nome}</p>
                    <h6>€ {ad.prezzo}/giorno</h6>
                  </div>
                </div>
              </Link>
            ))}
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
      ) : (
        <div className="Loading">
          <Loader />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProfiloUtente;
