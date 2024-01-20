/*const userValutationData = [
  {
    id: 1,
    voto: 8,
    descrizione: "Ottima esperienza con l'utente!",
    idValutatore: 2,
    idValutato: 1,
  },
  {
    id: 2,
    voto: 6,
    descrizione: "Interazione conforme alle aspettative.",
    idValutatore: 1,
    idValutato: 2,
  },
];*/

/*const getUserValutationsByValutatoId = (idValutato) => {
  return userValutationData.filter(
    (valutation) => valutation.idValutato === idValutato
  );
};*/

const getUserValutationsByValutatoId = async (idValutato) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/valutazione/visualizza-valutazioni-utente?valutato=${idValutato}`,
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

/*const addUserValutation = (newValutationData) => {
  const newUserValutationId = userValutationData.length + 1;

  const newUserValutation = {
    id: newUserValutationId,
    ...newValutationData,
  };

  userValutationData.push(newUserValutation);

  return newUserValutation;
};*/

const addUserValutation = async (newValutationData) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/valutazione/aggiungi-valutazione-utente",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newValutationData),
      }
    );

    return response;
  } catch (error) {
    console.error("Errore durante la richiesta di valutazione:", error.message);
    return "Errore durante la richiesta di valutazione";
  }
};

export { getUserValutationsByValutatoId, addUserValutation };
