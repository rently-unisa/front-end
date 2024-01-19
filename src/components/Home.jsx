import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { getPremiumAds } from "../services/annunciNoleggio";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import image1 from "../image/ondinaprova1.svg";
import image2 from "../image/ondinaprova2.svg";
import image3 from "../image/onda2nuovo1.svg";
import image4 from "../image/onda2nuovo2.svg";
import "../style/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [annunci, setAnnunci] = useState();
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(1);
  const [currentSlide3, setCurrentSlide3] = useState(2);
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    getPremiumAds().then((response) => {
      if (response.ok) {
        response.json().then((ad) => {
          setAnnunci(ad);
        });
      } else {
        response.json().then((result) => {
          alert(result.message);
        });
      }
    });
  }, []);

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
            <input
              type="text"
              placeholder="Cerca un articolo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="imagebox">
              <img className="imager" src={image1} alt="Immagine decorativa" />
              <img className="imagel" src={image2} alt="Immagine decorativa" />
              <button
                onClick={() => navigate(`/catalogo/${searchTerm}`)}
                className="cerca-button"
              >
                Cerca
              </button>
            </div>
          </div>
        </div>
        <div className="annunciHome">
          <p>Annunci</p>
          <div className="slider">
            <button onClick={prevSlide}>
              <ArrowBackIosIcon />
            </button>
            {annunci && (
              <div className="listaAnnunciHome">
                {annunci.map((ad, index) => (
                  <Link to={`/dettagli/${ad.id}`} key={ad.id}>
                    <div
                      key={ad.id}
                      className={`card ${
                        index === currentSlide1 ? "primo" : ""
                      } ${index === currentSlide2 ? "secondo" : ""} ${
                        index === currentSlide3 ? "terzo" : ""
                      } ${
                        index !== currentSlide1 &&
                        index !== currentSlide2 &&
                        index !== currentSlide3
                          ? "inactive"
                          : ""
                      }`}
                    >
                      <img src={ad.immagine} alt="Immgagine annuncio" />
                      <div className="card-description">
                        <p>{ad.nome}</p>
                        <h6>€ {ad.prezzo}/giorno</h6>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <button onClick={nextSlide}>
              <ArrowForwardIosIcon />
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
