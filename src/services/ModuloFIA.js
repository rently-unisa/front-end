const addForm = async (id, newForm) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/FIA/predict/" + id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newForm),
      }
    );

    return response;
  } catch (error) {
    console.error("Errore durante la richiesta di noleggio:", error.message);
    return "Errore durante la richiesta di noleggio";
  }
};

const getCategoriesAds = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/FIA/annunciCategoria?idUtente=${id}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    return "Errore nella richiesta degli annunci";
  }
};

export { addForm, getCategoriesAds };
