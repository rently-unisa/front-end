const messagesData = [
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
];

const getAllMessages = () => {
  return messagesData;
};

const getMessageById = (messageId) => {
  return messagesData.find((message) => message.id === messageId);
};

const addMessage = (newMessage) => {
  messagesData.push(newMessage);
};

const deleteMessageById = (messageId) => {
  const index = messagesData.findIndex((message) => message.id === messageId);
  if (index !== -1) {
    messagesData.splice(index, 1);
  }
};

const getMessagesByUserId = (userId) => {
  return messagesData.filter(
    (message) => message.idUtente1 === userId || message.idUtente2 === userId
  );
};

const modifyMessage = (modifiedMessage) => {
  deleteMessageById(modifiedMessage.id);
  messagesData.push(modifiedMessage);
};

export {
  getAllMessages,
  getMessageById,
  addMessage,
  deleteMessageById,
  getMessagesByUserId,
  modifyMessage,
};
