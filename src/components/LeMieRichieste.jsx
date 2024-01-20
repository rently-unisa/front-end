import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../AuthContext";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { getUserByUsername, getUserById } from "../services/utenti";
import {
  getRentalsRequestsByNoleggiante,
  getRentalsRequestsByNoleggiatore,
  getRentalById,
  modifyRental,
  deleteRentalById,
} from "../services/noleggi";
import { getAdById } from "../services/annunciNoleggio";
import "../style/ListPage.css";

const LeMieRichieste = () => {
  //questa pagina viene acceduta dal noleggiante o noleggiatore che vuole vedere le sue richieste di noleggio
  const { username } = useAuth();
  const user = getUserByUsername(username);
  const idUser = user.id; //id utente a prescindere che sia noleggiante o noleggiatore
  const param = useParams();
  const defaultChecked = true;
  const [checked, setChecked] = useState(
    param.checked === "true"
      ? true
      : param.checked === "false"
      ? false
      : defaultChecked
  );

  const [noleggianteRentalsRequests, setNoleggianteRentalsRequest] = useState(
    getRentalsRequestsByNoleggiante(idUser)
  );
  const [noleggiatoreRentalsRequests, setNoleggiatoreRentalsRequest] = useState(
    getRentalsRequestsByNoleggiatore(idUser)
  );

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleModifyState = (id, stato) => {
    const noleggio = getRentalById(id);
    noleggio.stato = stato;
    modifyRental(noleggio);
    console.log(noleggio.stato);
    setNoleggianteRentalsRequest(getRentalsRequestsByNoleggiante(idUser));
    setNoleggiatoreRentalsRequest(getRentalsRequestsByNoleggiatore(idUser));
  };

  const handlePayment = (id) => {
    //va chiamata l'API per il pagamento
    handleModifyState(id, "INIZIO");
    //pop-up eventualmente (?)
  };

  const handleDelete = (id) => {
    deleteRentalById(id);
    setNoleggianteRentalsRequest(getRentalsRequestsByNoleggiante(idUser));
  };

  const requests = checked ? (
    <div>
      <div className="rentalTitleContainer">
        <h1>Le mie richieste</h1>
        <div>
          <Link to={`/noleggi/${checked}`}>
            Vai alla pagina "I miei noleggi"
          </Link>
        </div>
      </div>
      <div className="rentalList">
        {noleggianteRentalsRequests.map((r) => (
          <div className="rental">
            <div className="rentalItem">
              <img
                src={getAdById(r.idAnnuncio).immagine}
                alt="Immagine annuncio"
              />
            </div>
            <div className="rentalItem">
              <h3>Annuncio</h3>
              {getAdById(r.idAnnuncio) && (
                <p>{getAdById(r.idAnnuncio).titolo}</p>
              )}
              <div className="pulsante">
                <Link to="/" style={{textDecoration: "none", color: "inherit"}}>Vai all'annuncio</Link>
              </div>
            </div>
            <div className="rentalItem">
              <h3>Autore dell'annuncio</h3>
              <p>{getUserById(r.noleggiatore).username}</p>
              <button className="pulsante">Contatta</button>
            </div>
            <div className="rentalItem">
              <h3>Intervallo noleggio</h3>
              <p>{r.dataInizio}</p>
              <p>{r.dataFine}</p>
            </div>
            <div className="rentalItem">
              <h3>Stato</h3>
              {r.stato === "ACCETTATA" && <p>Accettata</p>}
              {r.stato === "ACCETTATA" && (
                <button
                  className="pulsante"
                  onClick={() => handlePayment(r.id)}
                >
                  Effettua il pagamento
                </button>
              )}

              {r.stato === "RICHIESTA" && <p>In attesa...</p>}

              {r.stato === "RIFIUTATA" && <p>Rifiutata</p>}
              {r.stato === "RIFIUTATA" && (
                <button className="pulsante" onClick={() => handleDelete(r.id)}>
                  Elimina
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <div className="rentalTitleContainer">
        <h1>Le richieste per i miei annunci</h1>
        <div>
          <Link to={`/noleggi/${checked}`}>
            Vai alla pagina "I noleggi dei miei annunci"
          </Link>
        </div>
      </div>
      <div className="rentalList">
        {noleggiatoreRentalsRequests.map((r) => (
          <div className="rental">
            <div className="rentalItem">
              <img
                src={getAdById(r.idAnnuncio).immagine}
                alt="Immagine annuncio"
              />
            </div>
            <div className="rentalItem">
              <h3>Annuncio</h3>
              {getAdById(r.idAnnuncio) && (
                <p>{getAdById(r.idAnnuncio).titolo}</p>
              )}
              <div className="pulsante">
                <Link to="/">Vai all'annuncio</Link>
              </div>
            </div>
            <div className="rentalItem">
              <h3>Richiedente</h3>
              <p>{getUserById(r.noleggiante).username}</p>
              <button className="pulsante">Contatta</button>
            </div>
            <div className="rentalItem">
              <h3>Intervallo noleggio</h3>
              <p>{r.dataInizio}</p>
              <p>{r.dataFine}</p>
            </div>
            <div className="rentalItem">
              <h3>Stato</h3>
              {r.stato === "ACCETTATA" && <p>Accettata</p>}

              {r.stato === "RICHIESTA" && <p>In attesa...</p>}
              {r.stato === "RICHIESTA" && (
                <button
                  className="pulsante"
                  onClick={() => handleModifyState(r.id, "ACCETTATA")}
                >
                  Accetta
                </button>
              )}
              {r.stato === "RICHIESTA" && (
                <button
                  className="pulsante"
                  onClick={() => handleModifyState(r.id, "RIFIUTATA")}
                >
                  Rifiuta
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const theme = createTheme({
    palette: {
      primary: {
        main: "#282A28",
      },
    },
  });

  return (
    <div className="Page">
      <Navbar />
      <div className="listPageContainer">
        <div className="switchContainer">
          <div className="switchDescriptionContainer">
            <h3>
              Puoi visionare le tue richieste oppure le richieste per i tuoi
              annunci!
            </h3>
            <p>Clicca qui:</p>
          </div>
          <ThemeProvider theme={theme}>
            <Switch checked={checked} color="primary" onChange={handleChange} />
          </ThemeProvider>
          <div className="divider"></div>
        </div>
        {requests}
      </div>
      <div className="divisore"></div>
      <Footer />
    </div>
  );
};

export default LeMieRichieste;
