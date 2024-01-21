import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import {
  getRentalsByNoleggiante,
  getRentalsByNoleggiatore,
  getRentalById,
  modifyRental,
} from "../services/noleggi";
import { getUserById } from "../services/utenti.js";
import { getAdById } from "../services/annunciNoleggio";
import "../style/ListPage.css";
import ValutazioneOggetto from "./ValutazioneOggetto.jsx";
import ValutazioneUtente from "./ValutazioneUtente.jsx";
import Chat from "./Chat";
import Cookies from "js-cookie";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const IMieiNoleggi = () => {
  //questa pagina viene acceduta dal noleggiante o noleggiatore che vuole vedere le sue richieste di noleggio
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

  const [selectedStati, setSelectedStati] = useState([]);
  const handleStatiChange = (itemName) => {
    if (selectedStati.includes(itemName)) {
      setSelectedStati(selectedStati.filter((item) => item !== itemName));
    } else {
      setSelectedStati([...selectedStati, itemName]);
    }
  };
  const [isFiltraStatoOpen, setIsFiltraStatoOpen] = useState(false);
  const stati = [
    "RICHIESTA",
    "ACCETTATA",
    "RIFIUTATA",
    "INIZIO",
    "IN_CORSO",
    "FINE",
    "CONCLUSO",
    "CONCLUSOCONVALUTAZIONE",
  ];
  const handleFiltraStato = () => {
    isFiltraStatoOpen
      ? setIsFiltraStatoOpen(false)
      : setIsFiltraStatoOpen(true);
  };

  const [checked, setChecked] = useState(
    param.checked === "true"
      ? true
      : param.checked === "false"
      ? false
      : defaultChecked
  );
  const [noleggianteRentals, setNoleggianteRentals] = useState();
  const [noleggiatoreRentals, setNoleggiatoreRentals] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noleggianteResponse = await getRentalsByNoleggiante(idUser);
        if (noleggianteResponse.ok) {
          const noleggianteData = await noleggianteResponse.json();
          setNoleggianteRentals(noleggianteData);
        } else {
          const result = await noleggianteResponse.json();
          console.log(result.message);
        }

        const noleggiatoreResponse = await getRentalsByNoleggiatore(idUser);
        if (noleggiatoreResponse.ok) {
          const noleggiatoreData = await noleggiatoreResponse.json();
          setNoleggiatoreRentals(noleggiatoreData);
        } else {
          const result = await noleggiatoreResponse.json();
          console.log(result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idUser]);

  const [valutazioneOggettoParams, setValutazioneOggettoParams] = useState({
    idAnnuncio: null,
    idValutatore: null,
    idNoleggio: null,
  });
  const [valutazioneUtenteParams, setValutazioneUtenteParams] = useState({
    idValutato: null,
    idValutatore: null,
    idNoleggio: null,
  });
  const [buttonValutazioneOggetto, setButtonValutazioneOggetto] =
    useState(false);

  const handleOpenValutazioneOggetto = (
    idAnnuncio,
    idValutatore,
    idNoleggio
  ) => {
    setValutazioneOggettoParams({ idAnnuncio, idValutatore, idNoleggio });
    setButtonValutazioneOggetto(true);
  };

  const [buttonValutazioneUtente, setButtonValutazioneUtente] = useState(false);

  const handleOpenValutazioneUtente = (
    idValutato,
    idValutatore,
    idNoleggio
  ) => {
    setValutazioneUtenteParams({ idValutato, idValutatore, idNoleggio });
    setButtonValutazioneUtente(true);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleModifyState = (id, stato) => {
    getRentalById(id).then((response) => {
      if (response.ok) {
        response.json().then((rental) => {
          rental.stato = stato;
          modifyRental(rental);
        });
      } else {
        response.json().then((result) => {
          console.log(result.message);
        });
      }
    });

    getRentalsByNoleggiante(idUser).then((response) => {
      if (response.ok) {
        response.json().then((rental) => {
          setNoleggianteRentals(rental);
        });
      } else {
        response.json().then((result) => {
          console.log(result.message);
        });
      }
    });

    getRentalsByNoleggiatore(idUser).then((response) => {
      if (response.ok) {
        response.json().then((rental) => {
          setNoleggiatoreRentals(rental);
        });
      } else {
        response.json().then((result) => {
          console.log(result.message);
        });
      }
    });
  };

  const isStateSelected = (r) => {
    return selectedStati.length === 0 || selectedStati.includes(r.stato);
  };

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
        {checked ? (
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
              {isFiltraStatoOpen ? (
                <div className="CheckboxContainer">
                  <button onClick={handleFiltraStato}>
                    Filtra per stato
                    <KeyboardArrowDownIcon />
                  </button>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    {stati.map((item) => (
                      <div key={item}>
                        <input
                          type="checkbox"
                          id={item}
                          checked={selectedStati.includes(item)}
                          onChange={() => handleStatiChange(item)}
                        />
                        <label>{item}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="CheckboxContainer">
                  <button onClick={handleFiltraStato}>
                    Filtra per stato
                    <KeyboardArrowRightIcon />
                  </button>
                </div>
              )}
            </div>
            {noleggianteRentals && (
              <div className="rentalList">
                {noleggianteRentals.map((r) => (
                  <div
                    className={`rental ${isStateSelected(r) ? "" : "inactive"}`}
                  >
                    <div className="rentalItem">
                      <img
                        src={
                          getAdById(r.annuncio).then((response) => {
                            console.log(r);
                            if (response.ok) {
                              response.json().then((ad) => {
                                return ad;
                              });
                            } else {
                              response.json().then((result) => {
                                console.log(result.message);
                              });
                            }
                          })?.immagine
                        }
                        alt="Immagine annuncio"
                      />
                    </div>
                    <div className="rentalItem">
                      <h3>Annuncio</h3>
                      {
                        <p>
                          {
                            getAdById(r.annuncio).then((response) => {
                              if (response.ok) {
                                response.json().then((ad) => {
                                  return ad;
                                });
                              } else {
                                response.json().then((result) => {
                                  console.log(result.message);
                                });
                              }
                            })?.titolo
                          }
                        </p>
                      }
                      <div className="pulsante">
                        <Link to={`/dettagli/${r.annuncio}`}>
                          Vai all'annuncio
                        </Link>
                      </div>
                    </div>
                    <div className="rentalItem">
                      <h3>Autore dell'annuncio</h3>
                      <p>
                        {
                          getUserById(r.noleggiatore).then((response) => {
                            if (response.ok) {
                              response.json().then((user) => {
                                return user;
                              });
                            } else {
                              response.json().then((result) => {
                                console.log(result.message);
                              });
                            }
                          })?.username
                        }
                      </p>
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
                      {r.stato === "INIZIO" && <p>Inizio</p>}
                      {r.stato === "INIZIO" && (
                        <button
                          className="pulsante"
                          onClick={() => handleModifyState(r.id, "IN_CORSO")}
                        >
                          Ho ricevuto l'oggetto
                        </button>
                      )}
                      {r.stato === "IN_CORSO" && <p>In corso...</p>}
                      {r.stato === "FINE" && <p>Fine</p>}
                      {r.stato === "CONCLUSO" && <p>Conclusione</p>}
                      {r.stato === "CONCLUSO" &&
                        r.valutazioneAlNoleggiatore === false && (
                          <div>
                            <button
                              className="pulsante"
                              onClick={() =>
                                handleOpenValutazioneUtente(
                                  r.noleggiatore,
                                  idUser,
                                  r.id
                                )
                              }
                            >
                              Valuta l'autore
                            </button>
                            <ValutazioneUtente
                              trigger={buttonValutazioneUtente}
                              setTrigger={setButtonValutazioneUtente}
                              idValutato={valutazioneUtenteParams.idValutato}
                              idValutatore={
                                valutazioneUtenteParams.idValutatore
                              }
                              idNoleggio={valutazioneUtenteParams.idNoleggio}
                            ></ValutazioneUtente>
                          </div>
                        )}
                      {r.stato === "CONCLUSO" &&
                        r.valutazioneAnnuncio === false && (
                          <div>
                            <button
                              className="pulsante"
                              onClick={() =>
                                handleOpenValutazioneOggetto(
                                  r.annuncio,
                                  idUser,
                                  r.id
                                )
                              }
                            >
                              Valuta l'oggetto
                            </button>
                            <ValutazioneOggetto
                              trigger={buttonValutazioneOggetto}
                              setTrigger={setButtonValutazioneOggetto}
                              idAnnuncio={valutazioneOggettoParams.idAnnuncio}
                              idValutatore={
                                valutazioneOggettoParams.idValutatore
                              }
                              idNoleggio={valutazioneOggettoParams.idNoleggio}
                            ></ValutazioneOggetto>
                          </div>
                        )}
                      {r.stato === "CONCLUSOCONVALUTAZIONE" && (
                        <p>Noleggio Concluso</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
            {noleggiatoreRentals && (
              <div className="rentalList">
                {noleggiatoreRentals.map((r) => (
                  <div className="rental">
                    <div className="rentalItem">
                      <img
                        src={
                          getAdById(r.annuncio).then((response) => {
                            if (response.ok) {
                              response.json().then((ad) => {
                                return ad;
                              });
                            } else {
                              response.json().then((result) => {
                                console.log(result.message);
                              });
                            }
                          })?.immagine
                        }
                        alt="Immagine annuncio"
                      />
                    </div>
                    <div className="rentalItem">
                      <h3>Annuncio</h3>
                      {
                        <p>
                          {
                            getAdById(r.annuncio).then((response) => {
                              if (response.ok) {
                                response.json().then((ad) => {
                                  return ad;
                                });
                              } else {
                                response.json().then((result) => {
                                  console.log(result.message);
                                });
                              }
                            })?.titolo
                          }
                        </p>
                      }
                      <div className="pulsante">
                        <Link to={`/dettagli/${r.annuncio}`}>
                          Vai all'annuncio
                        </Link>
                      </div>
                    </div>
                    <div className="rentalItem">
                      <h3>Autore dell'annuncio</h3>
                      <p>
                        {
                          getUserById(r.noleggiante).then((response) => {
                            if (response.ok) {
                              response.json().then((user) => {
                                return user;
                              });
                            } else {
                              response.json().then((result) => {
                                console.log(result.message);
                              });
                            }
                          })?.username
                        }
                      </p>
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
                      {r.stato === "INIZIO" && <p>Inizio</p>}
                      {r.stato === "IN_CORSO" && <p>In corso...</p>}
                      {r.stato === "FINE" && <p>Fine</p>}
                      {r.stato === "FINE" && (
                        <button
                          className="pulsante"
                          onClick={() => handleModifyState(r.id, "CONCLUSO")}
                        >
                          Ho ricevuto l'oggetto indietro
                        </button>
                      )}
                      {r.stato === "CONCLUSO" && <p>Conclusione</p>}
                      {r.stato === "CONCLUSO" &&
                        r.valutazioneAlNoleggiante === false && (
                          <div>
                            <button
                              className="pulsante"
                              onClick={() =>
                                handleOpenValutazioneUtente(
                                  r.noleggiante,
                                  idUser,
                                  r.id
                                )
                              }
                            >
                              Valuta l'utente
                            </button>
                            <ValutazioneUtente
                              trigger={buttonValutazioneUtente}
                              setTrigger={setButtonValutazioneUtente}
                              idValutato={valutazioneUtenteParams.idValutato}
                              idValutatore={
                                valutazioneUtenteParams.idValutatore
                              }
                              idNoleggio={valutazioneUtenteParams.idNoleggio}
                            ></ValutazioneUtente>
                          </div>
                        )}
                      {r.stato === "CONCLUSOCONVALUTAZIONE" && (
                        <p>Noleggio Concluso</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="divisore"></div>
      <Footer />
    </div>
  );
};

export default IMieiNoleggi;
