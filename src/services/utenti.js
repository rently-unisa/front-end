import Cookies from "js-cookie";

const getUserByEmailAndPassword = async (email, password) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/autenticazione/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    return response;
  } catch (error) {
    return "Credenziali non valide";
  }
};

const getUserById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/area-personale/profilo-utente?id=${id}`,
      {
        method: "GET",
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

const addUser = async (newUserData) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/autenticazione/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta di registrazione:",
      error.message
    );
    return "Credenziali non valide";
  }
};

const modifyUser = async (newUserData) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/area-personale/modifica-dati-utente",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(newUserData),
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta di modifica dell'utente:",
      error.message
    );
    return "Modifica non riuscita";
  }
};

export { getUserByEmailAndPassword, getUserById, addUser, modifyUser };
