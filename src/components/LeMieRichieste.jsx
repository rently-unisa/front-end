import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../services/utenti";
import {
  getRentalsRequestsByNoleggiante,
  getRentalsRequestsByNoleggiatore,
  getRentalById,
  modifyRental,
} from "../services/noleggi";
import { getAdById } from "../services/annunciNoleggio";
import "../style/ListPage.css";
import Chat from "./Chat";
import Cookies from "js-cookie";
import { getMessagesByUsersId } from "../services/messaggi";
import { Alert, Box, Snackbar } from "@mui/material";

const LeMieRichieste = () => {
  const idUser = Cookies.get("id");
  const navigate = useNavigate();
  const param = useParams();
  const defaultChecked = true;
  const [chatParams, setChatParams] = useState({
    idEmittente: null,
    idRicevente: null,
  });
  const [chatVisibility, setChatVisibility] = useState(false);
  const handleOpenChat = (idEmittente, idRicevente) => {
    getMessagesByUsersId(idEmittente, idRicevente).then((response) => {
      if (response.ok) {
        response.json().then((messages) => {
          setChatParams({ idEmittente, idRicevente, messages });
        });
      }
    });
    setChatVisibility(true);
  };

  const [alertState, setAlertState] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAlert = (state, message) => {
    setAlertState(state);
    setAlertMessage(message);
    handleClick();
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
  const [noleggianteAds, setNoleggianteAds] = useState();
  const [noleggianteUsernames, setNoleggianteUsernames] = useState();
  const [noleggiatoreAds, setNoleggiatoreAds] = useState();
  const [noleggiatoreUsernames, setNoleggiatoreUsernames] = useState();

  const getAdsDate = async (id) => {
    try {
      const response = await getAdById(id);
      if (response.ok) {
        const rentals = await response.json();
        return { id, titolo: rentals.nome, immagine: rentals.immagine };
      } else {
        return { id, titolo: "", immagine: "" };
      }
    } catch (error) {
      console.error("Error fetching average:", error);
      return { id, titolo: "", immagine: "" };
    }
  };

  const getUsersDate = async (id) => {
    try {
      const response = await getUserById(id);
      if (response.ok) {
        const rentals = await response.json();
        return { id, username: rentals.username };
      } else {
        return { id, username: "" };
      }
    } catch (error) {
      console.error("Error fetching average:", error);
      return { id, username: "" };
    }
  };

  useEffect(() => {
    if (Cookies.get("id") === undefined) navigate("/forbidden");

    const handleAlert = (state, message) => {
      setAlertState(state);
      setAlertMessage(message);
      handleClick();
    };

    const fetchData = () => {
      getRentalsRequestsByNoleggiante(idUser).then(
        async (noleggianteResponse) => {
          if (noleggianteResponse.ok) {
            noleggianteResponse.json().then(async (noleggianteData) => {
              const adPromises = noleggianteData.map((rental) =>
                getAdsDate(rental.annuncio)
              );
              const adsData = await Promise.all(adPromises);
              const newAdsMapping = {};
              adsData.forEach((adData) => {
                newAdsMapping[adData.id] = {
                  titolo: adData.titolo,
                  immagine: adData.immagine,
                };
              });

              const userPromises = noleggianteData.map((rental) =>
                getUsersDate(rental.noleggiatore)
              );
              const usersData = await Promise.all(userPromises);
              const newUsersMapping = {};
              usersData.forEach((userData) => {
                newUsersMapping[userData.id] = {
                  username: userData.username,
                };
              });

              setNoleggianteRentalsRequest(noleggianteData);
              setNoleggianteAds(newAdsMapping);
              setNoleggianteUsernames(newUsersMapping);
            });
          } else {
            noleggianteResponse.json().then((result) => {
              handleAlert("error", result.message);
            });
          }
        }
      );

      getRentalsRequestsByNoleggiatore(idUser).then((noleggiatoreResponse) => {
        if (noleggiatoreResponse.ok) {
          noleggiatoreResponse.json().then(async (noleggiatoreData) => {
            const adPromises = noleggiatoreData.map((rental) =>
              getAdsDate(rental.annuncio)
            );
            const adsData = await Promise.all(adPromises);
            const newAdsMapping = {};
            adsData.forEach((rentalData) => {
              newAdsMapping[rentalData.id] = {
                titolo: rentalData.titolo,
                immagine: rentalData.immagine,
              };
            });

            const userPromises = noleggiatoreData.map((rental) =>
              getUsersDate(rental.noleggiante)
            );
            const usersData = await Promise.all(userPromises);
            const newUsersMapping = {};
            usersData.forEach((userData) => {
              newUsersMapping[userData.id] = {
                username: userData.username,
              };
            });

            setNoleggiatoreRentalsRequest(noleggiatoreData);
            setNoleggiatoreAds(newAdsMapping);
            setNoleggiatoreUsernames(newUsersMapping);
          });
        } else {
          noleggiatoreResponse.json().then((result) => {
            handleAlert("error", result.message);
          });
        }
      });
    };

    fetchData();
  }, [idUser, navigate]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleModifyState = (id, stato) => {
    getRentalById(id).then((response) => {
      if (response.ok) {
        response.json().then((noleggio) => {
          noleggio.stato = stato;
          modifyRental(noleggio).then((response) => {
            if (!response || response.status !== 201) {
              handleAlert("error", "Modifica non effettuata");
            } else {
              getRentalsRequestsByNoleggiante(idUser).then((response) => {
                if (response.ok) {
                  response.json().then((rental) => {
                    setNoleggianteRentalsRequest(rental);
                  });
                } else {
                  response.json().then((result) => {
                    handleAlert("error", result.message);
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
                    handleAlert("error", result.message);
                  });
                }
              });
            }
          });
        });
      } else {
        response.json().then((result) => {
          handleAlert("error", result.message);
        });
      }
    });
  };

  const handlePayment = (id) => {
    //va chiamata l'API per il pagamento
    handleModifyState(id, "INIZIO");
    handleAlert("success", "Pagamento effettuato con successo");
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
            <div className="rental" key={r.id}>
              <div className="rentalItem">
                <img
                  src={noleggianteAds[r.annuncio]?.immagine}
                  alt="Immagine annuncio"
                  loading="lazy"
                />
              </div>
              <div className="rentalItem">
                <h3>Annuncio</h3>
                {<p>{noleggianteAds[r.annuncio]?.titolo}</p>}
                <div className="pulsante">
                  <Link to={`/dettagli/${r.annuncio}`}>Vai all'annuncio</Link>
                </div>
              </div>
              <div className="rentalItem">
                <h3>Noleggiatore</h3>
                {<p>{noleggianteUsernames[r.noleggiatore]?.username}</p>}
                <div>
                  <button
                    className="pulsante"
                    onClick={() =>
                      handleOpenChat(r.noleggiante, r.noleggiatore)
                    }
                  >
                    Contatta
                  </button>
                  <Chat
                    trigger={chatVisibility}
                    setTrigger={setChatVisibility}
                    idEmittente={chatParams.idEmittente}
                    idRicevente={chatParams.idRicevente}
                    messages={chatParams.messages}
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
      {noleggiatoreRentalsRequests && (
        <div className="rentalList">
          {noleggiatoreRentalsRequests.map((r) => (
            <div className="rental" key={r.id}>
              <div className="rentalItem">
                <img
                  src={noleggiatoreAds[r.annuncio]?.immagine}
                  alt="Immagine annuncio"
                  loading="lazy"
                />
              </div>
              <div className="rentalItem">
                <h3>Annuncio</h3>
                {<p>{noleggiatoreAds[r.annuncio]?.titolo}</p>}
                <div className="pulsante">
                  <Link to={`/dettagli/${r.annuncio}`}>Vai all'annuncio</Link>
                </div>
              </div>
              <div className="rentalItem">
                <h3>Possibile noleggiante</h3>
                {<p>{noleggiatoreUsernames[r.noleggiante]?.username}</p>}
                <div>
                  <button
                    className="pulsante"
                    onClick={() =>
                      handleOpenChat(r.noleggiante, r.noleggiatore)
                    }
                  >
                    Contatta
                  </button>
                  <Chat
                    trigger={chatVisibility}
                    setTrigger={setChatVisibility}
                    idEmittente={chatParams.idEmittente}
                    idRicevente={chatParams.idRicevente}
                    messages={chatParams.messages}
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
      )}
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
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertState}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
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
      <div className="divisore"></div>
      <Footer />
    </div>
  );
};

export default LeMieRichieste;
