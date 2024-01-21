import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookies from "js-cookie";
import "../style/ListPage.css";
import { getAdsByUserId, deleteAdById } from "../services/annunciNoleggio";

const IMieiAnnunci = () => {
  const idUsername = Cookies.get("id");
  const [userAds, setAds] = useState();

  const getAnnunciUtente = (id) => {
    getAdsByUserId(id).then((response) => {
      if (response.ok) {
        response.json().then((ad) => {
          setAds(ad);
        });
      } else {
        response.json().then((result) => {
          alert(result.message);
        });
      }
    });
  };

  useEffect(() => {
    getAnnunciUtente(idUsername);
  }, [idUsername]);

  const handleDelete = (id) => {
    deleteAdById(id).then((response) => {
      if (response.ok) {
        getAnnunciUtente(idUsername);
      } else {
        alert("Errore");
      }
    });
  };

  return (
    <div className="Page">
      <Navbar />
      <div className="listPageContainer">
        <div className="rentalTitleContainer">
          <h1>I miei annunci</h1>
          <div className="pulsanteCreaAnnuncio">
            <Link
              to="/creaUnAnnuncio"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Crea un annuncio
            </Link>
          </div>
        </div>
        {userAds && (
          <div className="rentalList">
            {userAds.map((a) => (
              <div className="rental">
                <div className="rentalItem">
                  <img src={a.immagine} alt="Immagine annuncio" />
                </div>
                <div className="rentalItem">
                  <h3>Annuncio</h3>
                  <p>{a.nome}</p>
                  <p>{a.prezzo}€/giorno</p>
                </div>
                <div className="rentalItem">
                  <h3>Indirizzo</h3>
                  <p>
                    {a.strada}
                    {a.civico}, {a.città}({a.cap})
                  </p>
                </div>
                <div className="rentalItem">
                  <h3>Descrizione</h3>
                  <p>{a.descrizione}</p>
                </div>
                <div className="rentalItem">
                  <h3>Informazioni aggiuntive</h3>
                  <p>{a.condizioni}</p>
                  <p>{a.categoria}</p>
                </div>
                <div className="rentalItem">
                  <h3>Operazioni</h3>
                  <div className="pulsanteModifica">
                    <Link
                      to={`/modificaAnnuncio/${a.id}`}
                      key={a.id}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Modifica annuncio
                    </Link>
                  </div>
                  <button
                    className="pulsanteElimina"
                    onClick={() => handleDelete(a.id)}
                  >
                    Elimina
                  </button>
                  <div style={{ margin: "1px" }}></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default IMieiAnnunci;
