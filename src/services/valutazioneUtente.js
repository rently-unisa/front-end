const userValutetionData = [
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

const getAllUserValutetions = () => {
  return userValutetionData;
};

const getUserValutetionById = (id) => {
  return userValutetionData.find((valutetion) => valutetion.id === id);
};

const getUserValutetionsByValutatoId = (idValutato) => {
  return userValutetionData.filter(
    (valutetion) => valutetion.idValutato === idValutato
  );
};

const addUserValutetion = (newValutetionData) => {
  const newUserValutetionId = userValutetionData.length + 1;

  const newUserValutetion = {
    id: newUserValutetionId,
    ...newValutetionData,
  };

  userValutetionData.push(newUserValutetion);

  return newUserValutetion;
};

export {
  getAllUserValutetions,
  getUserValutetionById,
  getUserValutetionsByValutatoId,
  addUserValutetion,
};
