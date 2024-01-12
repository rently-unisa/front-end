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

/*const getUserValutetionsByValutatoId = async (idValutato) => {
  try {
    const response = await fetch(`http://localhost:8080/visualizza-valutazioni-utente?valutato=${idValutato}`);

    if (response.ok) {
      const valutetions = await response.json();
      return valutetions;
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Errore sconosciuto durante il recupero delle valutazioni');
    }
  } catch (error) {
    console.error('Errore durante la richiesta delle valutazioni:', error.message);
    return null;
  }
};

const addUserValutetion = async (newValutetionData) => {
  try {
    const response = await fetch('http://localhost:8080/aggiungi-valutazione-utente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newValutetionData),
    });

    if (response.ok) {
      const newValutetion = await response.json();
      return newValutetion;
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Errore sconosciuto durante l\'aggiunta della valutazione');
    }
  } catch (error) {
    console.error('Errore durante l\'aggiunta della valutazione:', error.message);
    return null;
  }
}; */

export { getUserValutetionsByValutatoId, addUserValutetion };
