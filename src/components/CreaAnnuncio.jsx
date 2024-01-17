import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { addAd } from "../services/annunciNoleggio";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../style/FormAnnunci.css";

const CreaAnnuncio = () => {
  const idUtente = Cookies.get("id");

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
  const [immaginiCaricate, setImmaginiCaricate] = useState([]);

  const [isCategoriaOpen, setIsCategoriaOpen] = useState(false);
  const categories = [
    "Elettronica",
    "Libri",
    "Elettrodomestici",
    "Giardino e giardinaggio",
    "Arte e musica",
    "Casa e cucina",
    "Auto e moto",
    "Oggettistica professionale",
    "Sport",
  ];
  const [isCondizioneOpen, setIsCondizioneOpen] = useState(false);
  const conditions = ["Ottima", "Buona", "Discreta"];

  const handleCreation = () => {
    const newAd = {
      id: 0,
      idUtente,
      nome: titolo,
      strada,
      città,
      civico: "",
      cap,
      descrizione,
      immagine,
      prezzo,
      categoria,
      dataFine,
      condizione: condizioni,
    };
    addAd(newAd, immaginiCaricate).then((response) => {
      if (!response.ok) {
        alert("Errore");
      }
    });
  };

  const handleCategoria = () => {
    isCategoriaOpen ? setIsCategoriaOpen(false) : setIsCategoriaOpen(true);
  };

  const handleCondizione = () => {
    isCondizioneOpen ? setIsCondizioneOpen(false) : setIsCondizioneOpen(true);
  };

  const handleCondizioneChange = (e) => {
    setCondizioni(e.target.value);
    setIsCondizioneOpen(false);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
    setIsCategoriaOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files;
    setImmaginiCaricate(file);
    /*if (file) {
      // Leggi il file come array di byte
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        setImmagine(arrayBuffer);
      };
      reader.readAsDataURL(file);
    }*/
  };

  useEffect(() => {
    if (dataFine && dayjs(dataFine).isBefore(dayjs(), "day")) {
      // Se la data è precedente alla data attuale, reimposta a null
      setDataFine(null);
    }
  }, [dataFine]);

  const Categoriabox = isCategoriaOpen ? (
    <div className="CheckboxContainer">
      <button onClick={handleCategoria}>
        Categoria
        <KeyboardArrowDownIcon />
      </button>
      <div
        style={{
          //riportare in CSS
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {categories.map((item) => (
          <div key={item}>
            <input
              type="radio"
              id={item}
              value={item}
              checked={categoria === item}
              onChange={handleCategoriaChange}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="CheckboxContainer">
      <button onClick={handleCategoria}>
        Categoria
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );

  const Condizionebox = isCondizioneOpen ? (
    <div className="CheckboxContainer">
      <button onClick={handleCondizione}>
        Condizione
        <KeyboardArrowDownIcon />
      </button>
      <div
        style={{
          //riportare in CSS
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {conditions.map((item) => (
          <div key={item}>
            <input
              type="radio"
              id={item}
              value={item}
              checked={condizioni === item}
              onChange={handleCondizioneChange}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="CheckboxContainer">
      <button onClick={handleCondizione}>
        Condizione
        <KeyboardArrowRightIcon />
      </button>
    </div>
  );

  const Databox = (
    <div className="parametro1">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Inserisci la data di fine disponibilità"
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
      <div className="containerAnnunci">
        <div className="leftContainerAnnunci">
          <div>
            <h1>Crea un annuncio</h1>
          </div>
          <div className="parametriAnnunci">
            <div className="parametro1">
              <p>Titolo</p>
              <input
                className="input"
                type="text"
                value={titolo}
                placeholder="Inserisci il titolo dell'annuncio"
                onChange={(e) => setTitolo(e.target.value)}
              />
            </div>
            <div className="parametro1">
              <p>Prezzo al giorno</p>
              <input
                className="input"
                type="number"
                value={prezzo}
                placeholder="Inserisci il prezzo/giorno"
                onChange={(e) => setPrezzo(e.target.value)}
              />
            </div>
            <div className="parametro1">
              <p>Strada</p>
              <input
                className="input"
                type="text"
                value={strada}
                placeholder="Inserisci la strada"
                onChange={(e) => setStrada(e.target.value)}
              />
            </div>
            <div className="parametro1">
              <p>Città</p>
              <input
                className="input"
                type="text"
                value={città}
                placeholder="Inserisci la città"
                onChange={(e) => setCittà(e.target.value)}
              />
            </div>
            <div className="parametro1">
              <p>CAP</p>
              <input
                className="input"
                type="text"
                value={cap}
                placeholder="Inserisci il CAP"
                onChange={(e) => setCap(e.target.value)}
              />
            </div>
          </div>
          <div className="annunciDescrizione">
            <div className="parametro1">
              <p>Descrizione</p>
              <textarea
                className="input"
                value={descrizione}
                placeholder="Inserisci la descrizione"
                onChange={(e) => setDescrizione(e.target.value)}
              />
            </div>
          </div>
          <div className="boxContainerAnnunci">
            {Categoriabox}
            {Condizionebox}
            {Databox}
          </div>
          <div>
            <button className="pulsante" onClick={handleCreation}>
              Conferma
            </button>
          </div>
        </div>
        <div className="rightContainerAnnunci">
          <div className="imageAnnunciContainer">
            <img src={immagine} alt="Immagine dell'annuncio" />
          </div>
          {Imagebox}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreaAnnuncio;
