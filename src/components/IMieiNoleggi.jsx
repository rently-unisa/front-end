import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../AuthContext";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { getUserByUsername, getUserById } from "../services/utenti";
import {
  getRentalsByNoleggiante,
  getRentalsByNoleggiatore,
  getRentalById,
  modifyRental,
} from "../services/noleggi";
import { getAdById } from "../services/annunciNoleggio";
import "../style/ListPage.css";
import ValutazioneOggetto from "./ValutazioneOggetto.jsx";
import ValutazioneUtente from "./ValutazioneUtente.jsx";

const IMieiNoleggi = () => {
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
  const [noleggianteRentals, setNoleggianteRentals] = useState(
    getRentalsByNoleggiante(idUser)
  );
  const [noleggiatoreRentals, setNoleggiatoreRentals] = useState(
    getRentalsByNoleggiatore(idUser)
  );
  const [valutazioneOggettoParams, setValutazioneOggettoParams] = useState({
    idAnnuncio: null,
    idValutatore: null,
  });
  const [valutazioneUtenteParams, setValutazioneUtenteParams] = useState({
    idValutato: null,
    idValutatore: null,
  });
  const [buttonValutazioneOggetto, setButtonValutazioneOggetto] =
    useState(false);

  const handleOpenValutazioneOggetto = (idAnnuncio, idValutatore) => {
    setValutazioneOggettoParams({ idAnnuncio, idValutatore });
    setButtonValutazioneOggetto(true);
  };

  const [buttonValutazioneUtente, setButtonValutazioneUtente] = useState(false);

  const handleOpenValutazioneUtente = (idValutato, idValutatore) => {
    setValutazioneUtenteParams({ idValutato, idValutatore });
    setButtonValutazioneUtente(true);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleModifyState = (id, stato) => {
    const noleggio = getRentalById(id);
    noleggio.stato = stato;
    modifyRental(noleggio);
    setNoleggianteRentals(getRentalsByNoleggiante(idUser));
    setNoleggiatoreRentals(getRentalsByNoleggiatore(idUser));
  };

  const rentals = checked ? (
    <div>
      <div className="rentalTitleContainer">
        <h1>I miei noleggi</h1>
        <div>
          <Link to={`/richieste/${checked}`}>
            Vai alla pagina "Le mie richieste"
          </Link>
        </div>
      </div>
      <div>
        <p>Seleziona un filtro:</p>
      </div>
      <div className="rentalList">
        {noleggianteRentals.map((r) => (
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
              {r.stato === "INIZIO" && <p>Inizio</p>}
              {r.stato === "INIZIO" && (
                <button
                  className="pulsante"
                  onClick={() => handleModifyState(r.id, "IN CORSO")}
                >
                  Ho ricevuto l'oggetto
                </button>
              )}
              {r.stato === "IN CORSO" && <p>In corso...</p>}
              {r.stato === "FINE" && <p>Fine</p>}
              {r.stato === "CONCLUSIONE" && <p>Conclusione</p>}
              {r.stato === "CONCLUSIONE" && (
                <div>
                  <button
                    className="pulsante"
                    onClick={() =>
                      handleOpenValutazioneUtente(r.noleggiatore, idUser)
                    }
                  >
                    Valuta l'autore
                  </button>
                  <ValutazioneUtente
                    trigger={buttonValutazioneUtente}
                    setTrigger={setButtonValutazioneUtente}
                    idValutato={valutazioneUtenteParams.idValutato}
                    idValutatore={valutazioneUtenteParams.idValutatore}
                  ></ValutazioneUtente>
                </div>
              )}
              {r.stato === "CONCLUSIONE" && (
                <div>
                  <button
                    className="pulsante"
                    onClick={() =>
                      handleOpenValutazioneOggetto(r.idAnnuncio, idUser)
                    }
                  >
                    Valuta l'oggetto
                  </button>
                  <ValutazioneOggetto
                    trigger={buttonValutazioneOggetto}
                    setTrigger={setButtonValutazioneOggetto}
                    idAnnuncio={valutazioneOggettoParams.idAnnuncio}
                    idValutatore={valutazioneOggettoParams.idValutatore}
                  ></ValutazioneOggetto>
                </div>
              )}
              {r.stato === "CONCLUSOCONVALUTAZIONE" && <p>Noleggio Concluso</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <div className="rentalTitleContainer">
        <h1>I noleggi dei miei annunci</h1>
        <div>
          <Link to={`/richieste/${checked}`}>
            Vai alla pagina "Le richieste dei miei annunci"
          </Link>
        </div>
      </div>
      <div>
        <p>Seleziona un filtro:</p>
      </div>
      <div className="rentalList">
        {noleggiatoreRentals.map((r) => (
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
              <h3>Autore dell'annuncio</h3>
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
              {r.stato === "INIZIO" && <p>Inizio</p>}
              {r.stato === "IN CORSO" && <p>In corso...</p>}
              {r.stato === "FINE" && <p>Fine</p>}
              {r.stato === "FINE" && (
                <button
                  className="pulsante"
                  onClick={() => handleModifyState(r.id, "CONCLUSIONE")}
                >
                  Ho ricevuto l'oggetto indietro
                </button>
              )}
              {r.stato === "CONCLUSIONE" && <p>Conclusione</p>}
              {r.stato === "CONCLUSIONE" && (
                <div>
                  <button
                    className="pulsante"
                    onClick={() =>
                      handleOpenValutazioneUtente(r.noleggiante, idUser)
                    }
                  >
                    Valuta l'utente
                  </button>
                  <ValutazioneUtente
                    trigger={buttonValutazioneUtente}
                    setTrigger={setButtonValutazioneUtente}
                    idValutato={valutazioneUtenteParams.idValutato}
                    idValutatore={valutazioneUtenteParams.idValutatore}
                  ></ValutazioneUtente>
                </div>
              )}
              {r.stato === "CONCLUSOCONVALUTAZIONE" && <p>Noleggio Concluso</p>}
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
              Puoi visionare i tuoi noleggi oppure i noleggi dei tuoi annunci!
            </h3>
            <p>Clicca qui:</p>
          </div>
          <ThemeProvider theme={theme}>
            <Switch checked={checked} color="primary" onChange={handleChange} />
          </ThemeProvider>
          <div className="divider"></div>
        </div>
        {rentals}
      </div>
      <Footer />
    </div>
  );
};

export default IMieiNoleggi;
