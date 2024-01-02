import React from "react";
import "../style/ChiSiamo.css";
import onda1 from "../image/onda1.svg";
import onda2 from "../image/onda2.svg";
import persone from "../image/persone1.svg";
import citta from "../image/citta1.svg";
import frecce from "../image/frecce1.svg";

const ChiSiamo = () => {
  return (
    <div className="Page">
      <img className="top-right" src={onda2} alt="Immagine decortiva" />

      <div className="container">
        <h1 className="titolo">Chi Siamo</h1>
        <div className="divisione1">
          <div className="container-pinfo">
            <div className="pinfo">
              L'attenzione all'
              <span style={{ color: "var(--verde)" }}>ambiente</span> e
              l'opportunità di{" "}
              <span style={{ color: "var(--verde)" }}>risparmio</span> (e
              guadagno) sono i principi su cui si fonda Rently.
            </div>
          </div>
          <img src={persone} alt="Immagine decortiva" />
        </div>
        <div className="divisione2">
          <img src={frecce} alt="Immagine decortiva" />
          <div className="container-pinfo2">
            <div className="pinfo2">
              Su Rently:
              <ul style={{ marginTop: "0" }}>
                <li>
                  Metti a noleggio oggetti che non usi e guadagni con essi.
                </li>
                <li>
                  Noleggi ciò di cui hai bisogno, risparmiando notevolmente.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="divisione3">
          <div className="container-pinfo3">
            <div className="pinfo3">
              In un mondo sensibile all'ecologia, questa è un'opportunità
              concreta per valorizzare gli oggetti poco usati, evitare acquisti
              inutili e ridurre le emissioni nocive dovute alla produzione di
              nuovi oggetti.
            </div>
          </div>
          <img src={citta} alt="Immagine decortiva" />
        </div>
      </div>

      <img className="bottom-left" src={onda1} alt="Immagine decortiva" />
    </div>
  );
};

export default ChiSiamo;
