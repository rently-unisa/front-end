import React from "react";
import "../style/PaginaErrore.css";
import image1 from "../image/criceto.png";
import image2 from "../image/criceto2.png";
import { Link } from "react-router-dom";

const PaginaErrore = ({ errorCode }) => {
  let errorMessage = "";
  let img = "";
  if (errorCode === 403) {
    errorMessage = "Errore 403 - Accesso negato";
    img = image2;
  } else {
    errorMessage = "Errore 404 - Pagina non trovata";
    img = image1;
  }
  console.log(errorCode);

  return (
    <div className="Page">
      <div className="errorBody">
        <div className="topError">
          <div className="errorLeft" style={{ justifyContent: "space-evenly" }}>
            <p style={{ fontWeight: "bolder", fontSize: "4rem" }}>
              {errorMessage}
            </p>{" "}
            <br /> Si è verificato un errore. Si prega di riprovare più tardi.
          </div>
          <div className="errorImg">
            <img className="errorImage" src={img} alt="Immagine errore" />
          </div>
        </div>
        <div className="bottomError">
          <Link to={"/"} className="homeButton">
            Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaginaErrore;
