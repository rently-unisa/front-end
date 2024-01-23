import axios from "axios";
import Cookies from "js-cookie";

const getAllAds = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/ricerca/all`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    return error;
  }
};

const getPremiumAds = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/ricerca/premium`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    return "Errore nella richiesta degli annunci";
  }
};

const getAdById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/annuncio/visualizza-annuncio?id=${id}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    console.error("Errore durante la richiesta di login");
    return "Credenziali non valide";
  }
};

const getAdsByUserId = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/annuncio/visualizza-annunci-utente?id=${id}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    console.error("Errore durante la richiesta di login");
    return "Credenziali non valide";
  }
};

const addAd = async (newAdData, image) => {
  try {
    const formData = new FormData();
    for (let key in newAdData) {
      formData.append(key, newAdData[key]);
    }
    formData.append("image", image);
    const response = await axios.post(
      "http://localhost:4000/api/annuncio/aggiungi-annuncio",
      formData,
      {
        headers: {
          Authorization: Cookies.get("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta di registrazione:",
      error.message
    );
  }
};

const deleteAdById = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/annuncio/delete-annuncio?id=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: Cookies.get("token"),
        },
      }
    );

    return response;
  } catch (error) {
    return "Credenziali non valide";
  }
};

const modifyAd = async (modifiedAd, image) => {
  try {
    const formData = new FormData();
    for (let key in modifiedAd) {
      formData.append(key, modifiedAd[key]);
    }
    if (image !== undefined || image !== null) formData.append("image", image);
    else formData.append("image", null);

    console.log(formData);
    const response = await axios.post(
      "http://localhost:4000/api/annuncio/modifica-annuncio",
      formData,
      {
        headers: {
          Authorization: Cookies.get("token"),
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta di registrazione:",
      error.message
    );
  }
};

export {
  getAllAds,
  getPremiumAds,
  getAdById,
  getAdsByUserId,
  addAd,
  deleteAdById,
  modifyAd,
};
