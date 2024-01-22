import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../AuthContext";
import { getUserByUsername } from "../services/utenti";
import { addAd } from "../services/annunciNoleggio";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../style/FormAnnunci.css";

const CreaAnnuncio = () => {
  const { username } = useAuth();
  const user = getUserByUsername(username);
  const idUtente = user.id;

  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [prezzo, setPrezzo] = useState();
  const [strada, setStrada] = useState("");
  const [città, setCittà] = useState("");
  const [cap, setCap] = useState("");
  const [immagine, setImmagine] = useState([]);
  const [dataFine, setDataFine] = useState();
  const [categoria, setCategoria] = useState("");
  const [condizioni, setCondizioni] = useState("");

  const handleCreation = () => {
    const newAd = {
      idUtente,
      titolo,
      strada,
      città,
      cap,
      descrizione,
      immagine,
      prezzo,
      categoria,
      dataFine,
      condizioni,
    };
    addAd(newAd);
  };

  const handleCondizioneChange = (e) => {
    setCondizioni(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
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
    if (dataFine && dayjs(dataFine).isBefore(dayjs(), "day")) {
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
            value={dataFine}
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
    textTransform: "capitalize",
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
      <div className="annunciBody">
        <h1>Crea un annuncio</h1>
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
                    value={città}
                    placeholder="Inserisci la città"
                    onChange={(e) => setCittà(e.target.value)}
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
                    checked={categoria === 'Elettronica'}
                    onChange={handleCategoriaChange}
                  />
                  Elettronica
                </label>
                <label>
                  <input
                    type="radio"
                    value="Libri"
                    checked={categoria === 'Libri'}
                    onChange={handleCategoriaChange}
                  />
                  Libri
                </label>
                <label>
                  <input
                    type="radio"
                    value="Elettrodomestici"
                    checked={categoria === 'Elettrodomestici'}
                    onChange={handleCategoriaChange}
                  />
                  Elettrodomestici
                </label>
                <label>
                  <input
                    type="radio"
                    value="Giardino e giardinaggio"
                    checked={categoria === 'Giardino e giardinaggio'}
                    onChange={handleCategoriaChange}
                  />
                  Giardino e giardinaggio
                </label>
                <label>
                  <input
                    type="radio"
                    value="Arte e musica"
                    checked={categoria === 'Arte e musica'}
                    onChange={handleCategoriaChange}
                  />
                  Arte e musica
                </label>
                <label>
                  <input
                    type="radio"
                    value="Casa e cucina"
                    checked={categoria === 'Casa e cucina'}
                    onChange={handleCategoriaChange}
                  />
                  Casa e cucina
                </label>
                <label>
                  <input
                    type="radio"
                    value="Oggettistica professionale"
                    checked={categoria === 'Oggettistica professionale'}
                    onChange={handleCategoriaChange}
                  />
                  Oggettistica professionale
                </label>
                <label>
                  <input
                    type="radio"
                    value="Sport"
                    checked={condizioni === 'Sport'}
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
                    checked={condizioni === 'Discreta'}
                    onChange={handleCondizioneChange}
                  />
                  Discreta
                </label>
                <label>
                  <input
                    type="radio"
                    value="Buona"
                    checked={condizioni === 'Buona'}
                    onChange={handleCondizioneChange}
                  />
                  Buona
                </label>
                <label>
                  <input
                    type="radio"
                    value="Ottima"
                    checked={condizioni === 'Ottima'}
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
          <button className="creaAnnuncioButton" onClick={handleCreation}>Conferma</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreaAnnuncio;
