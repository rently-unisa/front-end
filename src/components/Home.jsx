import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { getPremiumAds } from "../services/annunciNoleggio";
/*import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";*/
import image1 from "../image/ondinaprova1.svg";
import image2 from "../image/ondinaprova2.svg";
import image3 from "../image/onda2nuovo1.svg";
import image4 from "../image/onda2nuovo2.svg";
import "../style/Home.css";

const Home = () => {
  const [annunci, setAnnunci] = useState(getPremiumAds());
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(1);
  const [currentSlide3, setCurrentSlide3] = useState(2);

  const nextSlide = () => {
    setCurrentSlide1((prevSlide) => (prevSlide + 1) % annunci.length);
    setCurrentSlide2((prevSlide) => (prevSlide + 1) % annunci.length);
    setCurrentSlide3((prevSlide) => (prevSlide + 1) % annunci.length);
  };

  const prevSlide = () => {
    setCurrentSlide1(
      (prevSlide) => (prevSlide - 1 + annunci.length) % annunci.length
    );
    setCurrentSlide2(
      (prevSlide) => (prevSlide - 1 + annunci.length) % annunci.length
    );
    setCurrentSlide3(
      (prevSlide) => (prevSlide - 1 + annunci.length) % annunci.length
    );
  };

  return (
    <div className="Page">
      <Navbar />
      <div className="sezioneh">
        <img className="imaget" src={image4} alt="Immagine decorativa" />
        <div className="intestazione">
          <h2>Home</h2>
          <div className="descrizione">
            <p>Rently apre le porte al futuro dell'economia sostenibile:</p>
            <p>
              <span style={{ fontWeight: "bold" }}> risparmi</span> denaro
              evitando acquisti occasionali e{" "}
              <span style={{ fontWeight: "bold" }}>guadagni</span> su ciò che
              non usi
            </p>
            <p>
              {" "}
              mettendolo a <span style={{ fontWeight: "bold" }}>noleggio</span>.
            </p>
          </div>
          <div className="ricerca">
            <h4>Cerca il tuo prossimo noleggio</h4>
            <input type="text" placeholder="Cerca un articolo" />
            <div className="imagebox">
              <img className="imager" src={image1} alt="Immagine decorativa" />
              <img className="imagel" src={image2} alt="Immagine decorativa" />
              <button className="cerca-button">Cerca</button>
            </div>
          </div>
        </div>
        <div className="annunciHome">
          <p>Annunci</p>
          <div className="slider">
            <button onClick={prevSlide}>
              Previus{/*<ArrowBackIosIcon />*/}
            </button>
            <div className="listaAnnunciHome">
              {annunci.map((ad, index) => (
                <div
                  key={index}
                  className={`card ${index === currentSlide1 ? "primo" : ""} ${
                    index === currentSlide2 ? "secondo" : ""
                  } ${index === currentSlide3 ? "terzo" : ""}`}
                >
                  <img src={ad.immagine} alt="Immgagine annuncio" />
                  <div className="card-description">
                    <p>{ad.titolo}</p>
                    <p>€ {ad.prezzo}/giorno</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextSlide}>
              Next{/*<ArrowForwardIosIcon />*/}
            </button>
          </div>
          <Link className="scopri" to="/catalogo">
            Scopri altri annunci
          </Link>
        </div>
        <img className="imageb" src={image3} alt="Immagine decorativa" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
