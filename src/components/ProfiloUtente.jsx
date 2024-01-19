import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../services/utenti";
import { getAdsByUserId } from "../services/annunciNoleggio";
import { getUserValutationsByValutatoId } from "../services/valutazioneUtente";
import Loader from "./Loader";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Chat from "./Chat";
import Cookies from "js-cookie";

const ProfiloUtente = () => {
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
  const handleOpenChat = (idEmittente, idRicevente) => {
    setChatParams({ idEmittente, idRicevente });
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
        alert(result.message);
        return { id, username: "Utente sconosciuto" };
      }
    } catch (error) {
      console.error("Error fetching username:", error);
      return { id, username: "Utente sconosciuto" };
    }
  };

  useEffect(() => {
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
            alert(result.message);
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
            alert(result.message);
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
            alert(result.message);
          });
        }
      });
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="Page">
      <Navbar />
      {User && ratings ? (
        <div className="container">
          <h1>Profilo utente</h1>
          <div className="contact">
            <div className="contactUser">
              <AccountCircleIcon fontSize="large" className="contactIcon" />
              <p>{User.username}</p>
              <p>{User.nome}</p>
              <p>{User.cognome}</p>
            </div>
            <div className="contactButton">
              <div>
                <button
                  onClick={() => {
                    handleOpenChat(Cookies.get("id"), userId);
                  }}
                >
                  Contatta
                </button>
                <Chat
                  trigger={chatVisibility}
                  setTrigger={setChatVisibility}
                  idEmittente={chatParams.idEmittente}
                  idRicevente={chatParams.idRicevente}
                />
              </div>
            </div>
          </div>
          <div className="listaAnnunciCatalogo">
            {userAds.map((ad) => (
              <Link to={`/dettagli/${ad.id}`} key={ad.id}>
                <div className={`card `}>
                  <img src={ad.immagine} alt="Immgagine annuncio" />
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
