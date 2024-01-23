import { React, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Assistenza.css";
import image1 from "../image/assistenza.svg";
import image2 from "../image/assistenzaOndaSX.svg";
import image3 from "../image/assistenzaOndaDX.svg";
import { addSegnalazione } from "../services/assistenza.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.js";
import { getRentalsByNoleggiante } from "../services/noleggi.js";
import Cookies from "js-cookie";
import { Alert, Box, Snackbar } from "@mui/material";

const Assistenza = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [tipo, setTipo] = useState(null);
  const [contenuto, setContenuto] = useState("");
  const [email, setEmail] = useState("");
  const [rentals, setRentals] = useState();
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

  const handleTipoChange = (event) => {
    setTipo(event.target.value);
  };

  useEffect(() => {
    getRentalsByNoleggiante(Cookies.get("id")).then((response) => {
      if (response.status !== 403) {
        if (response.ok) {
          response.json().then((rental) => {
            setRentals(rental);
          });
        } else {
          response.json().then((result) => {
            setAlertState("error");
            setAlertMessage(result.message);
            handleClick();
          });
        }
      }
    });
  }, []);

  const handleAlert = () => {
    setAlertState("error");
    setAlertMessage(
      "Effettuare l'accesso per poter effettuare una segnalazione"
    );
    handleClick();
  };

  const handleSubmit = () => {
    if (rentals[0] !== undefined) {
      if (tipo !== null) {
        if (contenuto !== "") {
          const newSegnalazione = {
            tipo: tipo,
            contenuto: contenuto,
            idSegnalatore: Cookies.get("id"),
          };
          addSegnalazione(newSegnalazione).then((response) => {
            if (response.ok) {
              setAlertState("success");
              setAlertMessage("La segnalazione è stata inviata correttamente");
              handleClick();
              navigate("/");
            } else {
              setAlertState("error");
              setAlertMessage(
                "Errore durante la richiesta di segnalazione: ",
                response.text()
              );
              handleClick();
            }
          });
        } else {
          setAlertState("error");
          setAlertMessage("Il messaggio non può essere vuoto");
          handleClick();
        }
      } else {
        setAlertState("error");
        setAlertMessage("Inserisci un tipo di segnalazione");
        handleClick();
      }
    } else {
      setAlertState("error");
      setAlertMessage(
        "Non è possibie segnalare problemi senza aver mai effettuato un noleggio"
      );
      handleClick();
    }
  };

  return (
    <div className="Page">
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
      <Navbar />
      <div className="onde">
        <img className="ondaSX" src={image2} alt="Immagine decorativa" />
        <img className="ondaDX" src={image3} alt="Immagine decorativa" />
      </div>

      <div className="assistenzaContainer">
        <div className="boxForm">
          <div className="title"> Assistenza </div>
          <div className="description"> Inviaci un messaggio </div>

          <div className="fields">
            Seleziona una categoria di segnalazione
            <div className="radioButton">
              <label>
                <input
                  className="topOptions"
                  type="radio"
                  value="ritardo-consegna"
                  checked={tipo === "ritardo-consegna"}
                  onChange={handleTipoChange}
                />
                Ritardo consegna
              </label>
              <label>
                <input
                  className="topOptions"
                  type="radio"
                  value="ritardo-restituzione"
                  checked={tipo === "ritardo-restituzione"}
                  onChange={handleTipoChange}
                />
                Ritardo restituzione
              </label>
              <label>
                <input
                  className="bottomOptions"
                  type="radio"
                  value="oggetto-smarrito"
                  checked={tipo === "oggetto-smarrito"}
                  onChange={handleTipoChange}
                />
                Oggetto smarrito
              </label>
              <label>
                <input
                  type="radio"
                  value="oggetto-danneggiato"
                  checked={tipo === "oggetto-danneggiato"}
                  onChange={handleTipoChange}
                />
                Oggetto danneggiato
              </label>
            </div>
          </div>
          <div className="fields">
            Email
            <input
              className="textBox"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Inserisci la tua email"
            />
          </div>
          <div className="fields">
            Messaggio
            <input
              className="textBox"
              type="textarea"
              value={contenuto}
              onChange={(e) => setContenuto(e.target.value)}
              placeholder="Inserisci il tuo messaggio"
            />
          </div>
          <button
            className="button"
            onClick={() => (isLoggedIn ? handleSubmit() : handleAlert())}
          >
            Invia messaggio
          </button>
        </div>
        <div className="assistenzaImg">
          <img src={image1} alt="Immagine decorativa" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Assistenza;
