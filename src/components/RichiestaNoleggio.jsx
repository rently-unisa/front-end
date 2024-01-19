import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getUserById } from "../services/utenti";
import { addRental } from "../services/noleggi";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import "../style/RichiestaNoleggio.css";
import Cookies from "js-cookie";

const RichiestaNoleggio = ({
  idAnnuncio,
  idCreatore,
  prezzoAnnuncio,
  onClose,
}) => {
  const idUtente = Cookies.get("id");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      getUserById(idUtente).then((response) => {
        if (response.ok) {
          response.json().then((utente) => {
            setUser(utente);
          });
        } else {
          response.json().then((result) => {
            alert(result.message);
          });
        }
      });
    };

    fetchUser();
  }, [idUtente]);

  const handleAddRental = () => {
    const newRequest = {
      dataInizio: start,
      dataFine: end,
      dataRichiesta: dayjs(),
      noleggiante: user.id,
      noleggiatore: idCreatore,
      prezzoTotale: end.diff(start, "day") * prezzoAnnuncio,
      idAnnuncio: idAnnuncio,
    };

    addRental(newRequest).then((response) => {
      if (response.status === 500) {
        alert(
          "È presente una prenotazione dell'oggetto durante le date selezionate, selezionare un'arco temporale diverso"
        );
      } else if (!response.ok) {
        const errorMessage = response.text();
        throw new Error(
          errorMessage || "Errore sconosciuto durante la richiesta di noleggio"
        );
      } else {
        alert("Richiesta creata con successo");
      }
    });
    onClose();
    alert("Richiesta effettuata");
  };

  return (
    <div className="popupContainer">
      <div className="popupContent">
        <div className="popupHeader">
          <div className="popupTitle">Richiedi il noleggio</div>
          <button className="closeButton" onClick={onClose}>
            <CloseIcon fontSize="small" className="closeIcon" />
          </button>
        </div>
        <div className="popupBody">
          <div className="popupDate">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Data di inizio"
                  value={start}
                  onChange={(newValue) => {
                    if (
                      dayjs(newValue).isBefore(dayjs(), "day") ||
                      (end && dayjs(newValue).isAfter(dayjs(end), "day"))
                    ) {
                      setStart(null);
                    } else {
                      setStart(newValue);
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="popupDate">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Data di fine"
                  value={end}
                  onChange={(newValue) => {
                    if (
                      dayjs(newValue).isBefore(dayjs(), "day") ||
                      (start && dayjs(newValue).isBefore(dayjs(start), "day"))
                    ) {
                      setEnd(null);
                    } else {
                      setEnd(newValue);
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="popupButton">
            <button onClick={handleAddRental}>Richiedi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichiestaNoleggio;
