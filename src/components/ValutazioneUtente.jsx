import { React, useState } from "react";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import "../style/Valutazione.css";
import { addUserValutation } from "../services/valutazioneUtente.js";
import { Alert, Box, Snackbar } from "@mui/material";

function ValutazioneUtente(props) {
  const [rating, setRating] = useState(0);
  const [contenuto, setContenuto] = useState("");
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

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleSubmitUtente = () => {
    if (contenuto !== "") {
      console.log(props);
      const newValutazione = {
        voto: rating * 2,
        descrizione: contenuto,
        valutatore: props.idValutatore,
        valutato: props.idValutato,
        noleggio: props.idNoleggio,
      };
      addUserValutation(newValutazione).then((response) => {
        if (!response || response.status !== 201) {
          handleAlert(
            "error",
            "C'è stato un problema nel salvare la recensione"
          );
        } else {
          handleAlert(
            "success",
            "La valutazione è stata inviata correttamente"
          );
          props.setTrigger(false);
        }
      });
    } else handleAlert("error", "Inserisci una recensione");
  };

  return (
    props.trigger && (
      <div className="valutazione">
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
        <div className="valutazione-body">
          <button
            className="closeButton"
            onClick={() => props.setTrigger(false)}
          >
            <CloseIcon fontSize="small" className="closeIcon" />
          </button>
          <div className="valutazione-titolo">Recensione dell'utente</div>
          <div className="fields">
            <div className="valutazione-rating-box">
              Rating
              <div className="ratingStars">
                <Rating
                  style={{ color: "#282a28" }}
                  precision={0.5}
                  name="rating-input"
                  value={rating}
                  onChange={handleRatingChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="fields">
            Descrizione
            <textarea
              className="valutazione-textarea"
              type="textarea"
              value={contenuto}
              onChange={(e) => setContenuto(e.target.value)}
              placeholder="Scrivi la tua recensione"
              required
            />
          </div>
          <button className="valutazione-confirm" onClick={handleSubmitUtente}>
            Conferma recensione
          </button>
        </div>
      </div>
    )
  );
}

export default ValutazioneUtente;
