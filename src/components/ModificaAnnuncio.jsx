import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getAdById, modifyAd } from "../services/annunciNoleggio";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate, useParams } from "react-router-dom";
import "../style/FormAnnunci.css";
import Cookies from "js-cookie";
import { Alert, Box, Snackbar } from "@mui/material";

const ModificaAnnuncio = () => {
  const idUtente = Cookies.get("id");
  const navigate = useNavigate();
  const idAnnuncio = parseInt(useParams().id, 10);
  const [titolo, setTitolo] = useState();
  const [descrizione, setDescrizione] = useState();
  const [prezzo, setPrezzo] = useState();
  const [strada, setStrada] = useState();
  const [citta, setCitta] = useState();
  const [cap, setCap] = useState();
  const [immagine, setImmagine] = useState();
  const [dataFine, setDataFine] = useState();
  const [categoria, setCategoria] = useState();
  const [condizione, setCondizioni] = useState();
  const [immaginiCaricate, setImmaginiCaricate] = useState([]);
  const [alertState, setAlertState] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);

  const mapCategoriaToValue = (selectedCategoria) => {
    const categoriaMappings = {
      Elettronica: "ELETTRONICA",
      Libri: "LIBRI",
      Elettrodomestici: "ELETTRODOMESTICI",
      "Giardino e giardinaggio": "GIARDINO",
      "Arte e musica": "ARTE",
      "Casa e cucina": "CASAECUCINA",
      "Oggettistica professionale": "OGGETTISTICAPROFESSIONALE",
      Sport: "SPORT",
    };

    return categoriaMappings[selectedCategoria];
  };

  const mapCondizioneToValue = (selectedCondizione) => {
    const condizioneMappings = {
      Buona: "BUONA",
      Ottima: "OTTIMA",
      Discreta: "DISCRETA",
    };

    return condizioneMappings[selectedCondizione];
  };

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

  useEffect(() => {
    if (Cookies.get("id") === undefined) navigate("/forbidden");

    const handleAlert = (state, message) => {
      setAlertState(state);
      setAlertMessage(message);
      handleClick();
    };

    const fetchAd = async () => {
      await getAdById(idAnnuncio).then((response) => {
        if (response.ok) {
          response.json().then((ad) => {
            if (ad.idUtente === Cookies.get("id")) {
              setTitolo(ad.nome);
              setDescrizione(ad.descrizione);
              setPrezzo(ad.prezzo);
              setStrada(ad.strada);
              setCitta(ad.citta);
              setCap(ad.cap);
              setImmagine(ad.immagine);
              setDataFine(ad.dataFine);
              setCategoria(ad.categoria);
              setCondizioni(ad.condizione);
            } else navigate("/forbidden");
          });
        } else {
          handleAlert("error", "problemi a recuperare l'annuncio");
        }
      });
    };
    fetchAd();
  }, [idAnnuncio, navigate]);

  const handleModify = () => {
    if (/\s\S*\s/.test(strada)) {
      if (
        titolo !== "" &&
        strada !== "" &&
        titolo !== "" &&
        citta !== "" &&
        cap !== "" &&
        descrizione !== "" &&
        prezzo !== "" &&
        categoria !== undefined &&
        dataFine !== undefined &&
        condizione !== undefined
      ) {
        const modifiedAd = {
          id: idAnnuncio,
          idUtente,
          nome: titolo,
          strada,
          citta,
          cap,
          descrizione,
          prezzo: parseFloat(prezzo).toFixed(2),
          categoria: mapCategoriaToValue(categoria),
          dataFine: dayjs(dataFine).format("YYYY-MM-DD"),
          condizione: mapCondizioneToValue(condizione),
        };
        modifyAd(modifiedAd, immaginiCaricate).then((response) => {
          if (!response || response.status !== 201) {
            handleAlert("error", "Problemi nella modifica dell'annuncio");
          } else {
            navigate("/annunci");
          }
        });
      } else {
        handleAlert(
          "error",
          "Non è possibile creare un annuncio senza riempire tutti i parametri"
        );
      }
    } else {
      handleAlert("error", "Inserire l'indirizzo correttamente");
    }
  };

  const handleCondizioneChange = (e) => {
    setCondizioni(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImmaginiCaricate(file);
    if (file) {
      // Leggi il file come array di byte
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        setImmagine(arrayBuffer);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (
      dataFine &&
      dayjs(dataFine).isValid() &&
      dayjs(dataFine).isBefore(dayjs(), "day")
    ) {
      // Se la data è precedente alla data attuale, reimposta a null
      setDataFine(null);
    }
  }, [dataFine]);

  const Databox = (
    <div className="datePicker">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Data fine disponibilità"
            value={dayjs(dataFine)}
            onChange={(newValue) => {
              setDataFine(newValue);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const buttonStyle = {
    backgroundColor: "#282A28",
    fontFamily: "Fredoka",
    textTransform: "initial",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#FFFDF8",
    },
  };

  const Imagebox = (
    <div>
      <Button
        className="pulsante"
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={buttonStyle}
      >
        Inserisci l'immagine
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </div>
  );

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
      <div className="annunciBody">
        <h1>Modifica il tuo annuncio</h1>
        <div className="annunciContainer">
          <div className="containerSezione1">
            <div className="leftAnnunciContainer">
              <div className="parametriAnnunci">
                <div className="annunciFields">
                  Titolo
                  <input
                    className="input"
                    type="text"
                    value={titolo}
                    placeholder="Inserisci il titolo dell'annuncio"
                    onChange={(e) => setTitolo(e.target.value)}
                  />
                </div>
                <div className="annunciFields">
                  CAP
                  <input
                    className="input"
                    type="text"
                    value={cap}
                    placeholder="Inserisci il CAP"
                    onChange={(e) => setCap(e.target.value)}
                  />
                </div>
                <div className="annunciFields">
                  Strada
                  <input
                    className="input"
                    type="text"
                    value={strada}
                    placeholder="Inserisci la strada"
                    onChange={(e) => setStrada(e.target.value)}
                  />
                </div>
                <div className="annunciFields">
                  Città
                  <input
                    className="input"
                    type="text"
                    value={citta}
                    placeholder="Inserisci la città"
                    onChange={(e) => setCitta(e.target.value)}
                  />
                </div>
                <div className="annunciFields">
                  Descrizione
                  <textarea
                    className="input"
                    value={descrizione}
                    placeholder="Inserisci la descrizione"
                    onChange={(e) => setDescrizione(e.target.value)}
                  />
                </div>
                <div className="annunciFields">
                  Prezzo al giorno
                  <input
                    className="input"
                    type="number"
                    value={prezzo}
                    placeholder="Inserisci il prezzo/giorno"
                    onChange={(e) => setPrezzo(e.target.value)}
                  />
                </div>
              </div>
              <div className="containerSezione2">
                <div className="fields">
                  Seleziona una categoria
                  <div className="annunciRadioButton">
                    <label>
                      <input
                        type="radio"
                        value="Elettronica"
                        checked={categoria === "Elettronica"}
                        onChange={handleCategoriaChange}
                      />
                      Elettronica
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Libri"
                        checked={categoria === "Libri"}
                        onChange={handleCategoriaChange}
                      />
                      Libri
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Elettrodomestici"
                        checked={categoria === "Elettrodomestici"}
                        onChange={handleCategoriaChange}
                      />
                      Elettrodomestici
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Giardino e giardinaggio"
                        checked={categoria === "Giardino e giardinaggio"}
                        onChange={handleCategoriaChange}
                      />
                      Giardino e giardinaggio
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Arte e musica"
                        checked={categoria === "Arte e musica"}
                        onChange={handleCategoriaChange}
                      />
                      Arte e musica
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Casa e cucina"
                        checked={categoria === "Casa e cucina"}
                        onChange={handleCategoriaChange}
                      />
                      Casa e cucina
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Oggettistica professionale"
                        checked={categoria === "Oggettistica professionale"}
                        onChange={handleCategoriaChange}
                      />
                      Oggettistica professionale
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Sport"
                        checked={categoria === "Sport"}
                        onChange={handleCategoriaChange}
                      />
                      Sport
                    </label>
                  </div>
                </div>
                <div className="fields">
                  Seleziona una condizione
                  <div className="annunciRadioButton">
                    <label>
                      <input
                        type="radio"
                        value="Discreta"
                        checked={condizione === "Discreta"}
                        onChange={handleCondizioneChange}
                      />
                      Discreta
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Buona"
                        checked={condizione === "Buona"}
                        onChange={handleCondizioneChange}
                      />
                      Buona
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Ottima"
                        checked={condizione === "Ottima"}
                        onChange={handleCondizioneChange}
                      />
                      Ottima
                    </label>
                  </div>
                </div>
                {Databox}
              </div>
            </div>
            <div className="rightAnnunciContainer">
              <div className="imageAnnunciContainer">
                <img src={immagine} alt="Immagine dell'annuncio" />
              </div>
              {Imagebox}
            </div>
          </div>
          <button className="creaAnnuncioButton" onClick={handleModify}>
            Conferma
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ModificaAnnuncio;
