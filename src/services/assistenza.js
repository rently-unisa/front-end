//const segnalazioni = [];

/*const addSegnalazione = (newSegnalazione) => {
  const newID = segnalazioni.length + 1;
  newSegnalazione = {
    id: newID,
    ...newSegnalazione
  }
  segnalazioni.push(newSegnalazione);
  console.log(newSegnalazione);
}*/

const addSegnalazione = async (newSegnalazione) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/avvisi/aggiungi-segnalazione",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSegnalazione),
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta di segnalazione:",
      error.message
    );
    return "Errore durante la richiesta di segnalazione";
  }
};

export { addSegnalazione };
