import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../style/Dettagli.css";
import { getAdById } from "../services/annunciNoleggio";

const Dettagli = () => {
  const idAnnuncio = useParams();
  const [Annuncio, setAnnuncio] = useState();

  useEffect(() => {
    const fetchAd = async () => {
      const adData = await getAdById(parseInt(idAnnuncio.id, 10));
      setAnnuncio(adData);
    };

    fetchAd();
  }, [idAnnuncio]);

  return (
    <div className="container">
      <div className="title">{Annuncio && Annuncio.titolo}</div>
      <div className="detailsContainer">
        <div className="upperSection">
          <div className="description">{Annuncio && Annuncio.descrizione}</div>
          <div className="actionButtons">
            <div className="requestButton">
              <div className="buttonText">Richiedi il noleggio</div>
            </div>
            <div className="contactButton">
              <div className="buttonText">Contatta</div>
            </div>
          </div>
        </div>
        <div className="imageContainer"></div>
      </div>
      <div className="reviewsContainer">
        <div className="reviewsTitle">Recensioni sull'articolo</div>
        <div className="reviewsStats">
          <div className="reviewsNumber">Numero di reviews</div>
          <div className="overallRating">Overall rating</div>
          <div className="ratingDetails">
            <div className="averageRating">4.5</div>
            <div className="ratingStars">
              {/* Includi qui le immagini delle stelle o altri elementi per rappresentare il rating */}
            </div>
          </div>
        </div>
        <div className="userReviews">
          {/* Includi qui le recensioni degli utenti */}
        </div>
      </div>
    </div>
  );
};

export default Dettagli;
