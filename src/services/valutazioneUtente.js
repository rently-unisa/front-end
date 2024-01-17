const userValutationData = [
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
];

const getAllUserValutations = () => {
  return userValutationData;
};

const getUserValutationById = (id) => {
  return userValutationData.find((valutation) => valutation.id === id);
};

const getUserValutationsByValutatoId = (idValutato) => {
  return userValutationData.filter(
    (valutation) => valutation.idValutato === idValutato
  );
};

const addUserValutation = (newValutationData) => {
  const newUserValutationId = userValutationData.length + 1;

  const newUserValutation = {
    id: newUserValutationId,
    ...newValutationData,
  };

  userValutationData.push(newUserValutation);

  return newUserValutation;
};

export {
  getAllUserValutations,
  getUserValutationById,
  getUserValutationsByValutatoId,
  addUserValutation,
};
