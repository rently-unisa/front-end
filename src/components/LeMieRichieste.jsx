import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../services/utenti";
import {
  getRentalsRequestsByNoleggiante,
  getRentalsRequestsByNoleggiatore,
  getRentalById,
  modifyRental,
  deleteRentalById,
} from "../services/noleggi";
import { getAdById } from "../services/annunciNoleggio";
import "../style/ListPage.css";
import Chat from "./Chat";
import Cookies from "js-cookie";

const LeMieRichieste = () => {
  const idUser = Cookies.get("id");
  const param = useParams();
  const defaultChecked = true;
  const [chatParams, setChatParams] = useState({
    idEmittente: null,
    idRicevente: null,
  });
  const [chatVisibility, setChatVisibility] = useState(false);
  const handleOpenChat = (idEmittente, idRicevente) => {
    setChatParams({ idEmittente, idRicevente });
    setChatVisibility(true);
  };

  const [checked, setChecked] = useState(
    param.checked === "true"
      ? true
      : param.checked === "false"
      ? false
      : defaultChecked
  );

  const [noleggianteRentalsRequests, setNoleggianteRentalsRequest] = useState();
  const [noleggiatoreRentalsRequests, setNoleggiatoreRentalsRequest] =
    useState();

  useEffect(() => {
    getRentalsRequestsByNoleggiante(idUser).then((response) => {
      if (response.ok) {
        response.json().then((rental) => {
          setNoleggianteRentalsRequest(rental);
        });
      } else {
        response.json().then((result) => {
          alert(result.message);
        });
      }
    });

    getRentalsRequestsByNoleggiatore(idUser).then((response) => {
      if (response.ok) {
        response.json().then((rental) => {
          setNoleggiatoreRentalsRequest(rental);
        });
      } else {
        response.json().then((result) => {
          alert(result.message);
        });
      }
    });
  }, [idUser]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleModifyState = (id, stato) => {
    const noleggio = getRentalById(id);
    noleggio.stato = stato;
    modifyRental(noleggio).then((response) => {
      if (!response || response.status !== 201) {
        alert("Modifica non effettuata");
      } else {
        getRentalsRequestsByNoleggiante(idUser).then((response) => {
          if (response.ok) {
            response.json().then((rental) => {
              setNoleggianteRentalsRequest(rental);
            });
          } else {
            response.json().then((result) => {
              alert(result.message);
            });
          }
        });
        getRentalsRequestsByNoleggiatore(idUser).then((response) => {
          if (response.ok) {
            response.json().then((rental) => {
              setNoleggiatoreRentalsRequest(rental);
            });
          } else {
            response.json().then((result) => {
              alert(result.message);
            });
          }
        });
      }
    });
  };

  const handlePayment = (id) => {
    //va chiamata l'API per il pagamento
    handleModifyState(id, "INIZIO");
    //pop-up eventualmente (?)
  };

  const handleDelete = (id) => {
    deleteRentalById(id).then((response) => {
      if (response.ok) {
        getRentalsRequestsByNoleggiante(idUser).then((response) => {
          if (response.ok) {
            response.json().then((rental) => {
              setNoleggianteRentalsRequest(rental);
            });
          } else {
            response.json().then((result) => {
              alert(result.message);
            });
          }
        });
      } else {
        alert("Errore");
      }
    });
  };

  const renderRentals = (
    <div>
      <div className="rentalTitleContainer">
        <h1>Le mie richieste</h1>
        <div>
          <Link to={`/noleggi/${checked}`}>
            Vai alla pagina "I miei noleggi"
          </Link>
        </div>
      </div>
      {noleggianteRentalsRequests && (
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
                  <Link to="/">Vai all'annuncio</Link>
                </div>
              </div>
              <div className="rentalItem">
                <h3>Autore dell'annuncio</h3>
                <p>{getUserById(r.noleggiatore).username}</p>
                <div>
                  <button
                    className="pulsante"
                    onClick={() => {
                      handleOpenChat(r.noleggiante, r.noleggiatore);
                    }}
                  >
                    Contatta
                  </button>
                  <Chat
                    trigger={chatVisibility}
                    setTrigger={setChatVisibility}
                    idEmittente={chatParams.idEmittente}
                    idRicevente={chatParams.idRicevente}
                  />
                </div>
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
                  <button
                    className="pulsante"
                    onClick={() => handleDelete(r.id)}
                  >
                    Elimina
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderRentalDetails = (
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
              <div>
                <button
                  className="pulsante"
                  onClick={() => {
                    handleOpenChat(r.noleggiatore, r.noleggiante);
                  }}
                >
                  Contatta
                </button>
                <Chat
                  trigger={chatVisibility}
                  setTrigger={setChatVisibility}
                  idEmittente={chatParams.idEmittente}
                  idRicevente={chatParams.idRicevente}
                />
              </div>
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
        {checked ? renderRentals : renderRentalDetails}
      </div>
      <Footer />
    </div>
  );
};

export default LeMieRichieste;
