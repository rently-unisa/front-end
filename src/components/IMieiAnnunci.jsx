import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import "../style/ListPage.css";
import { getUserByUsername } from "../services/utenti";
import { getAdsByUserId, deleteAdById } from "../services/annunciNoleggio";

const IMieiAnnunci = () => {
  const { username } = useAuth();
  const user = getUserByUsername(username);
  const idUser = user.id;
  const [userAds, setAds] = useState(getAdsByUserId(idUser));

  const handleDelete = (id) => {
    deleteAdById(id);
    setAds(getAdsByUserId(idUser));
  };

  return (
    <div className="Page">
      <Navbar />
      <div className="listPageContainer">
        <div className="rentalTitleContainer">
          <h1>I miei annunci</h1>
          <div className="pulsanteCreaAnnuncio">
            <Link to="/creaUnAnnuncio" style={{textDecoration: "none", color: "inherit"}}>Crea un annuncio</Link>
          </div>
        </div>
        <div className="rentalList">
          {userAds.map((a) => (
            <div className="rental">
              <div className="rentalItem">
                <img src={a.immagine} alt="Immagine annuncio" />
              </div>
              <div className="rentalItem">
                <h3>Annuncio</h3>
                <p>{a.titolo}</p>
                <p>{a.prezzo}</p>
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
                  <Link to={`/modificaAnnuncio/${a.id}`} key={a.id} style={{textDecoration: "none", color: "inherit"}}>
                    Modifica
                  </Link>
                </div>
                <button className="pulsanteElimina" onClick={() => handleDelete(a.id)}>
                  Elimina
                </button>
                <div style={{margin: "1px"}}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="divisore"></div>
      </div>
      <Footer />
    </div>
  );
};

export default IMieiAnnunci;
