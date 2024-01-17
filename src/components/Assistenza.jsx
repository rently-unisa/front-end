import { React, useState } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../style/Assistenza.css";
import image1 from "../image/assistenza.svg";
import image2 from "../image/assistenzaOndaSX.svg";
import image3 from "../image/assistenzaOndaDX.svg";
import { addSegnalazione } from "../services/assistenza.js";
import { getUserByEmail } from "../services/utenti.js";
import { useNavigate } from "react-router-dom";
import ValutazioneOggetto from './ValutazioneOggetto.jsx';
import ValutazioneUtente from './ValutazioneUtente.jsx';

const Assistenza = () => {
    const navigate = useNavigate();
    const [tipo, setTipo] = useState(null);
    const [contenuto, setContenuto] = useState("");
    const [email, setEmail] = useState("");

    const [buttonValutazioneUtente, setButtonValutazioneUtente] = useState(false);
    const [buttonValutazioneOggetto, setButtonValutazioneOggetto] = useState(false);
  
    const handleTipoChange = (event) => {
      setTipo(event.target.value);
    };

    const handleSubmit = () => {
      if (tipo !== null) {
        const user = getUserByEmail (email);
        if (user) {
          if(contenuto !== "") {
            const newSegnalazione = {
              tipo: tipo,
              contenuto: contenuto,
              idSegnalatore: user.id
            };
            addSegnalazione(newSegnalazione);
            alert("La segnalazione è stata inviata correttamente");
            navigate("/");
          } else alert("Il messaggio non può essere vuoto");
        }else alert("L'email inserita non è valida");
      } else alert("Inserisci un tipo di segnalazione");
      
    }

  return (
    <div className="Page">
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
                <input className="topOptions"
                  type="radio"
                  value="ritardo-consegna"
                  checked={tipo === 'ritardo-consegna'}
                  onChange={handleTipoChange}
                />
                Ritardo consegna
              </label>
              <label>
                <input className="topOptions"
                  type="radio"
                  value="ritardo-restituzione"
                  checked={tipo === 'ritardo-restituzione'}
                  onChange={handleTipoChange}
                />
                Ritardo restituzione
              </label>
              <label>
                <input className="bottomOptions"
                  type="radio"
                  value="oggetto-smarrito"
                  checked={tipo === 'oggetto-smarrito'}
                  onChange={handleTipoChange}
                />
                Oggetto smarrito
              </label>
              <label>
                <input
                  type="radio"
                  value="oggetto-danneggiato"
                  checked={tipo === 'oggetto-danneggiato'}
                  onChange={handleTipoChange}
                />
                Oggetto danneggiato
              </label>
            </div>
          </div>
          <div className="fields">
            Email
            <input className="textBox"
            type="text"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Inserisci la tua email"
            />
          </div>
          <div className="fields">
            Messaggio
            <input className="textBox"
            type="textarea"
            value={contenuto} onChange={(e) => setContenuto(e.target.value)}
            placeholder="Inserisci il tuo messaggio"
            />
          </div>
          <button className="button" onClick={handleSubmit}>
            Invia messaggio
          </button>
          <div>
          <button className="valutazione-button" onClick={() => setButtonValutazioneOggetto(true)}>
            Valutazione oggetto
          </button>
          <ValutazioneOggetto trigger={buttonValutazioneOggetto} setTrigger={setButtonValutazioneOggetto}></ValutazioneOggetto>
          <button className="valutazione-button" onClick={() => setButtonValutazioneUtente(true)}>
            Valutazione utente
          </button>
          <ValutazioneUtente trigger={buttonValutazioneUtente} setTrigger={setButtonValutazioneUtente}></ValutazioneUtente>
        </div>
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
