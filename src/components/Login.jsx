import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getUserByEmailAndPassword } from "../services/utenti";
import logoNonDaltonici from "../image/Logo.png";
import logoDaltonici from "../image/RentlyFinaleDaltonici.png";
import "../style/Login.css";
import image1 from "../image/ondinaprova1.svg";
import image2 from "../image/ondinaprova2.svg";
import image3 from "../image/ondadoppia1.svg";
import image4 from "../image/ondadoppia2.svg";
import { Alert, Box, Snackbar } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, daltonico } = useAuth();
  const navigate = useNavigate();
  const [logo, setLogo] = useState(logoNonDaltonici);
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

  const hendleAlert = (state, message) => {
    setAlertState(state);
    setAlertMessage(message);
    handleClick();
  };

  useEffect(() => {
    setLogo(daltonico ? logoDaltonici : logoNonDaltonici);
  }, [daltonico]);

  const handleLogin = () => {
    if (username === "" || password === "")
      hendleAlert("error", "inserire entrambi i parametri");
    else {
      getUserByEmailAndPassword(username, password).then((response) => {
        if (response.ok) {
          response.json().then((newUser) => {
            if (newUser) {
              login(newUser);
              navigate("/");
            } else {
              hendleAlert("error", "Errore durante il login");
            }
          });
        } else {
          response.json().then((result) => {
            hendleAlert("error", result.message);
          });
        }
      });
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
      <img className="top" src={image4} alt="Immagine decorativa" />
      <div className="box">
        <div className="image-box">
          <img className="right" src={image1} alt="Immagine decorativa" />
          <img className="left" src={image2} alt="Immagine decorativa" />
          <div className="Logo-box">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="brand-name">ently</div>
          </div>
        </div>
        <div className="titolo">Accedi</div>
        <div className="parametro">
          <p>Email</p>
          <input
            type="text"
            value={username}
            placeholder="Inserisci la tua email"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="parametro">
          <p>Password</p>
          <input
            type="password"
            value={password}
            placeholder="Inserisci la tua password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="pulsante" onClick={handleLogin}>
          Accedi
        </button>
        <div className="opzioni">
          <p>
            Non hai ancora un account? <Link to="/signup">Registrati</Link>
          </p>
          <p>
            Torna alla <Link to="/">home</Link>
          </p>
        </div>
      </div>
      <img className="bottom" src={image3} alt="Immagine decorativa" />
    </div>
  );
};

export default Login;
