/*const messagesData = [
  {
    id: 1,
    testo: "Ciao, come stai?",
    orarioInvio: "2023-01-15T08:30:00",
    idUtente1: 1,
    idUtente2: 2,
  },
  {
    id: 2,
    testo: "Tutto bene, grazie!",
    orarioInvio: "2023-01-15T09:00:00",
    idUtente1: 2,
    idUtente2: 1,
  },
  // Aggiungi altri messaggi secondo necessità
];*/

/*const addMessage = (newMessageData) => {
  const newMessageId = messagesData.length + 1;

  const newMessage = {
    id: newMessageId,
    ...newMessageData,
  };

  messagesData.push(newMessage);

  return newMessage;
};*/

const addMessage = async (newMessageData) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/valutazione/aggiungi-valutazione-utente",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessageData),
      }
    );

    return response;
  } catch (error) {
    console.error("Errore durante l'invio del messaggio:", error.message);
    return "Errore durante l'invio del messaggio";
  }
};

/*const getMessagesByUsersId = (userId1, userId2) => {
  return messagesData.filter(
    (message) =>
      (message.idUtente1 === userId1 && message.idUtente2 === userId2) ||
      (message.idUtente2 === userId1 && message.idUtente1 === userId2)
  );
};*/

const getMessagesByUsersId = async (userId1, userId2) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/chat/visualizza-chat?userId1=${userId1}&userId2=${userId2}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    return "Errore nella richiesta degli annunci";
  }
};

export { addMessage, getMessagesByUsersId };
