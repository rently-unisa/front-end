import Cookies from "js-cookie";

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

const addObjectValutations = async (newValutationData) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/valutazione/aggiungi-valutazione-oggetto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
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

export { getObjectValutationsByAnnuncioId, addObjectValutations };
