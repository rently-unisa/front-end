import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAuth } from "../AuthContext";
import { getRentalsByAnnuncioId } from "../services/noleggi";
import { getUserByUsername } from "../services/utenti";
import { addRental } from "../services/noleggi";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import "../style/RichiestaNoleggio.css";

const RichiestaNoleggio = ({
  idAnnuncio,
  idCreatore,
  prezzoAnnuncio,
  dataFinale,
  onClose,
}) => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [rent, setRent] = useState();
  const { username } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchDate = async () => {
      const rent = await getRentalsByAnnuncioId(idAnnuncio);
      const user = await getUserByUsername(username);
      console.log(rent);
      console.log(user);
      setRent(rent);
      setUser(user);
    };

    fetchDate();
  }, [idAnnuncio, username]);

  const handleConferma = () => {
    if (
      start === null ||
      end === null ||
      dayjs(start).isAfter(dayjs(end), "day") ||
      dayjs(end).isBefore(dayjs(start), "day") ||
      dayjs(end).isBefore(dayjs(), "day") ||
      dayjs(start).isBefore(dayjs(), "day")
    ) {
      alert("Date inserite non valide");
    } else {
      if (dayjs(end).isAfter(dayjs(dataFinale), "day")) {
        console.log(start);
        console.log(dataFinale);
        alert(
          `Le noleggio supera il termine imposto dall'utente: ${dataFinale}`
        );
      } else {
        if (
          rent.length !== 0 &&
          rent.some(
            (noleggio) =>
              (dayjs(start).isAfter(dayjs(noleggio.dataInizio), "day") &&
                dayjs(start).isBefore(dayjs(noleggio.dataFine), "day")) ||
              (dayjs(end).isAfter(dayjs(noleggio.dataInizio), "day") &&
                dayjs(end).isBefore(dayjs(noleggio.dataFine), "day")) ||
              (dayjs(start).isBefore(dayjs(noleggio.dataInizio), "day") &&
                dayjs(end).isAfter(dayjs(noleggio.dataInizio), "day"))
          )
        ) {
          alert(
            `Le date richieste vanno in conflitto con dei noleggi già approvati`
          );
        } else {
          const newRequest = {
            dataInizio: start,
            dataFine: end,
            dataRichiesta: dayjs(),
            noleggiante: user.id,
            noleggiatore: idCreatore,
            prezzoTotale: end.diff(start, "day") * prezzoAnnuncio,
            idAnnuncio: idAnnuncio,
          };
          addRental(newRequest);
          onClose();
          alert("Richiesta effettuata");
        }
      }
    }
  };

  return (
    <div className="popupContainer">
      {rent && (
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
              <button onClick={handleConferma}>Richiedi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichiestaNoleggio;
