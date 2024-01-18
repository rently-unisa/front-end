import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import { useAuth } from "../AuthContext";
import RichiestaNoleggio from "./RichiestaNoleggio";
import { getAdById } from "../services/annunciNoleggio";
import { getUserById } from "../services/utenti";
import { getObjectValutationsByAnnuncioId } from "../services/valutazioneOggetto";
import { Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Slider from "@mui/material/Slider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../style/Dettagli.css";

const Dettagli = () => {
  const idAnnuncio = parseInt(useParams().id, 10);
  const [Annuncio, setAnnuncio] = useState();
  const [adUser, setAdUser] = useState();
  const [ratings, setRatings] = useState();
  const [usernames, setUsernames] = useState();
  const { isLoggedIn } = useAuth();
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      const adData = await getAdById(idAnnuncio);
      await new Promise((resolve) => setTimeout(resolve, 2000)); //non serve
      setAnnuncio(adData);
      fetchUser(adData.idUtente);
      fetchRating(adData.id);
    };

    const fetchUser = async (adUtente) => {
      const adUtente1 = await getUserById(adUtente);
      setAdUser(adUtente1);
    };

    const fetchRating = async (id) => {
      const adRatings = await getObjectValutationsByAnnuncioId(id);
      setRatings(adRatings);
      const names = await Promise.all(
        adRatings.map(async (rating) => {
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

    fetchAd();
  }, [idAnnuncio]);

  return (
    <div className="Page">
      <Navbar />
      {Annuncio ? (
        <>
          <div className="container">
            <div className="title">{Annuncio.titolo}</div>
            <div className="detailsContainer">
              <div className="leftSection">
                <div className="adDescription">
                  <p>{Annuncio.descrizione}</p>
                  <p>
                    <span>Condizioni: </span>
                    {Annuncio.condizioni}
                  </p>
                </div>
                <div className="actionButtons">
                  <div className="requestButton">
                    <button
                      onClick={() =>
                        isLoggedIn
                          ? setPopupVisible(true)
                          : alert("Fare l'accesso per poter fare una richiesta")
                      }
                    >
                      Richiedi il noleggio
                    </button>
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
                      <button>Contatta</button>
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
