import Cookies from "js-cookie";

const addMessage = async (newMessageData) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/chat/aggiungi-messaggio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
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

const getMessagesByUsersId = async (userId1, userId2) => {
  try {
    const data = {
      id: 0,
      descrizione: "",
      orarioInvio: "",
      mittente: userId1,
      destinatario: userId2,
    };
    const response = await fetch(
      `http://localhost:4000/api/chat/visualizza-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(data),
      }
    );

    return response;
  } catch (error) {
    return "Errore nella richiesta degli annunci";
  }
};

export { addMessage, getMessagesByUsersId };
