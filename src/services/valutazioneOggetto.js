const valutazioniOggettoData = [
  {
    id: 1,
    voto: 8,
    descrizione: "Ottimo prodotto!",
    idValutatore: 2,
    idAnnuncio: 1,
  },
  {
    id: 2,
    voto: 6,
    descrizione: "Conforme alla descrizione.",
    idValutatore: 1,
    idAnnuncio: 2,
  },
  {
    id: 3,
    voto: 9,
    descrizione: "Transazione veloce e prodotto di qualità.",
    idValutatore: 2,
    idAnnuncio: 3,
  },
  {
    id: 4,
    voto: 7,
    descrizione: "Buono, ma piccolo problema con la spedizione.",
    idValutatore: 1,
    idAnnuncio: 4,
  },
  {
    id: 5,
    voto: 5,
    descrizione: "Non corrisponde alle aspettative.",
    idValutatore: 1,
    idAnnuncio: 5,
  },
  {
    id: 6,
    voto: 10,
    descrizione: "Eccezionale qualità e servizio!",
    idValutatore: 1,
    idAnnuncio: 6,
  },
  {
    id: 7,
    voto: 8,
    descrizione: "Rapido e professionale.",
    idValutatore: 1,
    idAnnuncio: 7,
  },
];

const getAllValutazioniOggetto = () => {
  return valutazioniOggettoData;
};

const getValutazioniOggettoById = (id) => {
  return valutazioniOggettoData.find((valutazione) => valutazione.id === id);
};

const getValutazioniOggettoByAnnuncioId = (idAnnuncio) => {
  return valutazioniOggettoData.filter(
    (valutazione) => valutazione.idAnnuncio === idAnnuncio
  );
};

const addValutazioneOggetto = (newValutazioneData) => {
  const newValutazioneId = valutazioniOggettoData.length + 1;

  const nuovaValutazione = {
    id: newValutazioneId,
    ...newValutazioneData,
  };

  valutazioniOggettoData.push(nuovaValutazione);

  return nuovaValutazione;
};

export {
  getAllValutazioniOggetto,
  getValutazioniOggettoById,
  getValutazioniOggettoByAnnuncioId,
  addValutazioneOggetto,
};
