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
import { Alert, Box, Snackbar } from "@mui/material";

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

  useEffect(() => {
    const handleAlert = (state, message) => {
      setAlertState(state);
      setAlertMessage(message);
      handleClick();
    };

    const fetchUser = async () => {
      getUserById(idUtente).then((response) => {
        if (response.ok) {
          response.json().then((utente) => {
            setUser(utente);
          });
        } else {
          response.json().then((result) => {
            handleAlert("error", result.message);
          });
        }
      });
    };

    fetchUser();
  }, [idUtente]);

  const handleAddRental = () => {
    if (
      start === null ||
      end === null ||
      dayjs(start).isBefore(dayjs(), "day") ||
      dayjs(start).isAfter(dayjs(end), "day") ||
      dayjs(end).isSame(dayjs(), "day") ||
      dayjs(end).isBefore(dayjs(), "day") ||
      dayjs(end).isBefore(dayjs(start), "day") ||
      dayjs(start).isSame(dayjs(end), "day")
    ) {
      handleAlert("error", "Inserite date non valide");
    } else {
      const newRequest = {
        dataInizio: dayjs(start).format("YYYY-MM-DD"),
        dataFine: dayjs(end).format("YYYY-MM-DD"),
        dataRichiesta: dayjs().format("YYYY-MM-DD"),
        noleggiante: user.id,
        noleggiatore: idCreatore,
        prezzoTotale: end.diff(start, "day") * prezzoAnnuncio,
        annuncio: idAnnuncio,
      };
      addRental(newRequest).then((response) => {
        if (response.status === 500) {
          handleAlert(
            "error",
            "È presente una prenotazione dell'oggetto durante le date selezionate, selezionare un'arco temporale diverso"
          );
        } else if (!response.ok) {
          handleAlert(
            "error",
            "Errore sconosciuto durante la richiesta di noleggio"
          );
        } else {
          response.json().then((noleggio) => {
            fetch(
              `http://localhost:4000/api/avvisi/notifica-arrivo-richiesta-noleggio?idNoleggio=${noleggio.id}`,
              {
                method: "GET",
              }
            );
          });
          handleAlert("success", "Richiesta creata con successo");
          onClose();
        }
      });
    }
  };

  return (
    <div className="popupContainer">
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
