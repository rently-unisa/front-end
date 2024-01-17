const segnalazioni = [];

const addSegnalazione = (newSegnalazione) => {
  newSegnalazione = {
    id: segnalazioni.length + 1,
    ...newSegnalazione
  }
  segnalazioni.push(newSegnalazione);
}

export {addSegnalazione};