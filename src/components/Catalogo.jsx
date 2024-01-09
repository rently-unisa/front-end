import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getAllAds, getPremiumAds } from "../services/annunciNoleggio";
import "../style/Catalogo.css";

const Catalogo = () => {
  const [premiumAds, setPremiumAds] = useState([]);
  const [allAds, setAllAds] = useState([]);

  useEffect(() => {
    const fetchPremiumAds = async () => {
      const premiumData = await getPremiumAds();
      setPremiumAds(premiumData);
    };

    const fetchAllAds = async () => {
      const allData = await getAllAds();
      setAllAds(allData);
    };

    fetchPremiumAds();
    fetchAllAds();
  }, []);

  const catalogItems = [
    ...premiumAds,
    ...allAds.filter(
      (ad) => !premiumAds.some((premiumAd) => premiumAd.id === ad.id)
    ),
  ];

  return (
    <div className="Page">
      <Navbar />
      <div className="orizontal">
        <div className="cercaFiltra">
          <div className="Ricerca">
            <input type="text" placeholder="Cerca un articolo" />
            <button>Cerca</button>
          </div>
          <div className="Filtra"></div>
        </div>
        <div className="listaAnnunciCatalogo">
          {catalogItems.map((ad) => (
            <div key={ad.id} className="card active">
              <img src={ad.immagine} alt="Immgagine annuncio" />
              <div className="card-description">
                <p>{ad.titolo}</p>
                <h6>€ {ad.prezzo}/giorno</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalogo;
