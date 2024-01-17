const segnalazioni = [];

const addSegnalazione = (newSegnalazione) => {
  const newID = segnalazioni.length + 1;
  newSegnalazione = {
    id: newID,
    ...newSegnalazione
  }
  segnalazioni.push(newSegnalazione);
  console.log(newSegnalazione);
}

export {addSegnalazione};