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

const ProfiloUtente = () => {
  const userId = parseInt(useParams().id, 10);
  const [User, setUser] = useState();
  const [userAds, setUserAds] = useState();
  const [ratings, setRatings] = useState();
  const [usernames, setUsernames] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(userId);
      await new Promise((resolve) => setTimeout(resolve, 2000)); //non serve
      setUser(userData);
      fetchUserAds(userData.id);
      fetchRating(userData.id);
    };

    const fetchUserAds = async (id) => {
      const ads = await getAdsByUserId(id);
      setUserAds(ads);
    };

    const fetchRating = async (id) => {
      const userRatings = await getUserValutationsByValutatoId(id);
      setRatings(userRatings);
      const names = await Promise.all(
        userRatings.map(async (rating) => {
          const username = await fetchUsername(rating.idValutatore);
          return username;
        })
      );
      setUsernames(names);
    };

    const fetchUsername = async (id) => {
      const name = await getUserById(id);
      return name;
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="Page">
      <Navbar />
      {User ? (
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
              <button>Contatta</button>
            </div>
          </div>
          <div className="listaAnnunciCatalogo">
            {userAds.map((ad) => (
              <Link to={`/dettagli/${ad.id}`} key={ad.id}>
                <div className={`card `}>
                  <img src={ad.immagine} alt="Immgagine annuncio" />
                  <div className="card-description">
                    <p>{ad.titolo}</p>
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
