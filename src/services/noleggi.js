import Cookies from "js-cookie";

const getRentalById = async (rentalId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/visualizza-noleggio?idNoleggio=${rentalId}`,
      {
        method: "GET",
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta del profilo utente:",
      error.message
    );
  }
};

const getRentalsByNoleggiante = async (noleggianteId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/noleggiante?idUtente=${noleggianteId}`,
      {
        method: "GET",
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    );

    return response;
  } catch (error) {
    return "Noleggi non recuperati";
  }
};

const getRentalsByNoleggiatore = async (noleggiatoreId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/noleggiatore?idUtente=${noleggiatoreId}`,
      {
        method: "GET",
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    );

    return response;
  } catch (error) {
    return "Noleggi non recuperati";
  }
};

const getRentalsRequestsByNoleggiante = async (noleggianteId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/richieste/noleggiante?idUtente=${noleggianteId}`,
      {
        method: "GET",
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    );

    return response;
  } catch (error) {
    return "Noleggi non recuperati";
  }
};

const getRentalsRequestsByNoleggiatore = async (noleggiatoreId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/richieste/noleggiatore?idUtente=${noleggiatoreId}`,
      {
        method: "GET",
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    );

    return response;
  } catch (error) {
    return "Noleggi non recuperati";
  }
};

const addRental = async (newRental) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/noleggio/aggiungi-noleggio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(newRental),
      }
    );

    return response;
  } catch (error) {
    console.error("Errore durante la richiesta di noleggio:", error.message);
    return "Errore durante la richiesta di noleggio";
  }
};

const modifyRental = async (modifiedRental) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/noleggio/salva-noleggio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(modifiedRental),
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta di modifica del noleggio:",
      error.message
    );
    return "Errore durante la richiesta di modifica del noleggio";
  }
};

export {
  getRentalById,
  getRentalsByNoleggiante,
  getRentalsByNoleggiatore,
  getRentalsRequestsByNoleggiante,
  getRentalsRequestsByNoleggiatore,
  addRental,
  modifyRental,
};
