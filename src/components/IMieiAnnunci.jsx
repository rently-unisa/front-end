import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Cookies from "js-cookie";
import "../style/ListPage.css";
import { getAdsByUserId, deleteAdById } from "../services/annunciNoleggio";
import { Alert, Box, Snackbar } from "@mui/material";

const IMieiAnnunci = () => {
  const idUsername = Cookies.get("id");
  const [userAds, setAds] = useState();
  const [alertState, setAlertState] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("id") === undefined) navigate("/forbidden");
  }, [navigate]);

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

  const mapCategoriaToValue = (selectedCategoria) => {
    const categoriaMappings = {
      ELETTRONICA: "Elettronica",
      LIBRI: "Libri",
      ELETTRODOMESTICI: "Elettrodomestici",
      GIARDINO: "Giardino e giardinaggio",
      ARTE: "Arte e musica",
      CASAECUCINA: "Casa e cucina",
      OGGETTISTICAPROFESSIONALE: "Oggettistica professionale",
      SPORT: "Sport",
    };

    return categoriaMappings[selectedCategoria];
  };

  const mapCondizioneToValue = (selectedCondizione) => {
    const condizioneMappings = {
      BUONA: "Buona",
      OTTIMA: "Ottima",
      DISCRETA: "Discreta",
    };

    return condizioneMappings[selectedCondizione];
  };

  const getAnnunciUtente = (id) => {
    getAdsByUserId(id).then((response) => {
      if (response.ok) {
        response.json().then((ad) => {
          setAds(ad);
        });
      } else {
        response.json().then((result) => {
          handleAlert("error", result.message);
        });
      }
    });
  };

  useEffect(() => {
    const handleAlert = (state, message) => {
      setAlertState(state);
      setAlertMessage(message);
      handleClick();
    };

    const getAnnunciUtente = (id) => {
      getAdsByUserId(id).then((response) => {
        if (response.ok) {
          response.json().then((ad) => {
            setAds(ad);
          });
        } else {
          response.json().then((result) => {
            handleAlert("error", result.message);
          });
        }
      });
    };

    getAnnunciUtente(idUsername);
  }, [idUsername]);

  const handleDelete = (id) => {
    deleteAdById(id).then((response) => {
      if (response.ok) {
        getAnnunciUtente(idUsername);
      } else {
        handleAlert("error", "Errore nella cancellazione dell'annuncio");
      }
    });
  };

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
                  <img
                    src={a.immagine}
                    alt="Immagine annuncio"
                    loading="lazy"
                  />
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
                  <p>{mapCondizioneToValue(a.condizione)}</p>
                  <p>{mapCategoriaToValue(a.categoria)}</p>
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
