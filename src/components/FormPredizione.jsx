import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { addForm } from "../services/ModuloFIA";
import logoNonDaltonici from "../image/Logo.png";
import logoDaltonici from "../image/RentlyFinaleDaltonici.png";
import image1 from "../image/ondina1.svg";
import image2 from "../image/onda3.svg";
import image3 from "../image/onda4.svg";
import Cookies from "js-cookie";
import "../style/Signup.css";
import { Alert, Box, Snackbar } from "@mui/material";

const FormPredizione = () => {
  const id = Cookies.get("id");
  const [gender, setGender] = useState(1);
  const [married, setMarried] = useState(1);
  const [graduated, setGraduated] = useState(1);
  const [budget, setBudget] = useState(2);
  const [profession, setProfession] = useState(0);
  const [age, setAge] = useState();
  const [familySize, setFamilySize] = useState();
  const [logo, setLogo] = useState(logoNonDaltonici);
  const { daltonico } = useAuth();
  const navigate = useNavigate();
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
    setLogo(daltonico ? logoDaltonici : logoNonDaltonici);
  }, [daltonico]);

  const handleForm = () => {
    if (age === undefined || familySize === undefined) {
      handleAlert("error", "Inserire tutti i campi");
    } else if (age > 5) {
      if (age <= 100) {
        const newForm = {
          Gender: parseInt(gender, 10),
          Married: parseInt(married, 10),
          Graduated: parseInt(graduated, 10),
          Budget: parseInt(budget, 10),
          Profession: parseInt(profession, 10),
          Age: parseInt(age, 10),
          Family_Size: parseInt(familySize, 10),
        };
        console.log(newForm);
        addForm(id, newForm).then((response) => {
          if (response.ok) {
            navigate("/");
          } else {
            response.json().then((errorMessage) => {
              if (errorMessage !== null && errorMessage !== "") {
                handleAlert("error", errorMessage.message);
              } else {
                handleAlert("error", "Errore durante l'invio del form");
              }
            });
          }
        });
      } else {
        handleAlert("error", "Età inserita troppo elevata");
      }
    } else {
      handleAlert("error", "Età inserita troppo bassa");
    }
  };

  return (
    <div style={{ justifyContent: "center" }} className="Page">
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
      <img className="topr" src={image3} alt="Immagine decorativa" />
      <div className="box1">
        <div className="image-box1" style={{ width: "60rem" }}>
          <img src={image1} alt="Immagine decorativa" />
          <div className="titolo">Migliora la tua esperienza su </div>
          <div className="Logo-box">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="brand-name">ently</div>
          </div>
          <img
            style={{ transform: "scaleX(-1)" }}
            src={image1}
            alt="Immagine decorativa"
          />
        </div>
        <div className="par">
          <p>Compila subito il form di Rently per i tuoi consigliati:</p>{" "}
          <p>trova velocemente, spendi saggiamente.</p>
        </div>
        <div className="params">
          <div className="param">
            <p>Sesso</p>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              {/*Controllare se 0 e 1 combaciano con quelli backend*/}
              <option value={1}>Maschio</option>
              <option value={0}>Femmina</option>
            </select>
          </div>
          <div className="param">
            <p>Budget di Spesa</p>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            >
              {/*Controllare se 0 e 1 combaciano con quelli backend*/}
              <option value={2}>fino a 50€</option>
              <option value={0}>fino a 100€</option>
              <option value={1}>anche più di 100€</option>
            </select>
          </div>
          <div className="param">
            <p>Sposato</p>
            <select
              value={married}
              onChange={(e) => setMarried(e.target.value)}
              required
            >
              {/*Controllare se 0 e 1 combaciano con quelli backend*/}
              <option value={1}>Sì</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div className="param">
            <p>Diplomato</p>
            <select
              value={graduated}
              onChange={(e) => setGraduated(e.target.value)}
              required
            >
              {/*Controllare se 0 e 1 combaciano con quelli backend*/}
              <option value={1}>Sì</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div className="param">
            <p>Età</p>
            <input
              type="number"
              value={age}
              placeholder="La tua età"
              onChange={(e) => setAge(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className="param">
            <p>Grandezza Nucleo Familiare</p>
            <input
              type="number"
              value={familySize}
              placeholder="La grandezza della tua famiglia"
              onChange={(e) => setFamilySize(e.target.value)}
              required
              min="0"
            />
          </div>
          <div className="param">
            <p>Area Professionale</p>
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            >
              {/*Controllare se 0 e 1 combaciano con quelli backend*/}
              <option value={0}>Artistica</option>
              <option value={5}>Sanitaria</option>
              <option value={3}>Intrattenimento</option>
              <option value={1}>Medicina</option>
              <option value={2}>Ingegneria</option>
              <option value={7}>Legge</option>
              <option value={4}>Esecutiva</option>
              <option value={8}>Marketing</option>
              <option value={6}>Casalinga</option>
            </select>
          </div>
        </div>
        <button className="pulsante" onClick={handleForm}>
          Invia il form
        </button>
      </div>
      <img className="bottoml" src={image2} alt="Immagine decorativa" />
    </div>
  );
};

export default FormPredizione;
