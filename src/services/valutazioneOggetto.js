const objectValutationData = [
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

const getAllObjectValutations = () => {
  return objectValutationData;
};

const getObjectValutationsById = (id) => {
  return objectValutationData.find((valutation) => valutation.id === id);
};

/*const getObjectValutationsByAnnuncioId = (idAnnuncio) => {
  return objectValutationData.filter(
    (valutation) => valutation.idAnnuncio === idAnnuncio
  );
}; */

const getObjectValutationsByAnnuncioId = async (idAnnuncio) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/valutazione/visualizza-valutazioni-annuncio?id=${idAnnuncio}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta delle valutazioni degli oggetti: ",
      error.message
    );
  }
};

const addObjectValutations = (newValutationData) => {
  const newValutationId = objectValutationData.length + 1;

  const newValutation = {
    id: newValutationId,
    ...newValutationData,
  };

  objectValutationData.push(newValutation);

  return newValutation;
};

export {
  getAllObjectValutations,
  getObjectValutationsById,
  getObjectValutationsByAnnuncioId,
  addObjectValutations,
};
