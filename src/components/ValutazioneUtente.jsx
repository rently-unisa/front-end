import { React, useState } from "react";
import Rating from "@mui/material/Rating";
import CloseIcon from "@mui/icons-material/Close";
import "../style/Valutazione.css";
import { addUserValutation } from "../services/valutazioneUtente.js";

function ValutazioneUtente(props) {
  const [rating, setRating] = useState(0);
  const [contenuto, setContenuto] = useState("");

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
          alert("C'è stato un problema nel salvare la recensione");
        } else {
          alert("La valutazione è stata inviata correttamente");
          props.setTrigger(false);
        }
      });
    } else alert("Inserisci una recensione");
  };

  return props.trigger ? (
    <div className="valutazione">
      <div className="valutazione-body">
        <button className="closeButton" onClick={() => props.setTrigger(false)}>
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
          />
        </div>
        <button className="valutazione-confirm" onClick={handleSubmitUtente}>
          Conferma recensione
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ValutazioneUtente;
