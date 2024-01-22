//import { getPremiumUsers } from "./utenti";
import axios from "axios";
import Cookies from "js-cookie";

/*const adsData = [
  {
    id: 1,
    idUtente: 1,
    titolo: "Annuncio 1",
    strada: "Via Example 1",
    città: "Città1",
    cap: "12345",
    descrizione: "Descrizione dell'annuncio 1.",
    immagine: "/images/ad1.jpg",
    prezzo: 50.99,
    categoria: "Elettronica",
    dataFine: "2024-01-15",
    condizioni: "Nuovo",
  },
  {
    id: 2,
    idUtente: 2,
    titolo: "Annuncio 2",
    strada: "Via Example 2",
    città: "Città2",
    cap: "67890",
    descrizione: "Descrizione dell'annuncio 2.",
    immagine: "/images/ad2.jpg",
    prezzo: 30.5,
    categoria: "Abbigliamento",
    dataFine: "2024-02-01",
    condizioni: "Usato",
  },
  {
    id: 3,
    idUtente: 3,
    titolo: "Annuncio 3",
    strada: "Via Nuova 3",
    città: "Città1",
    cap: "54321",
    descrizione: "Descrizione dell'annuncio 3.",
    immagine: "/images/ad3.jpg",
    prezzo: 80.0,
    categoria: "Mobili",
    dataFine: "2024-03-10",
    condizioni: "Ricondizionato",
  },
  {
    id: 4,
    idUtente: 5,
    titolo: "Annuncio 4",
    strada: "Via Vecchia 7",
    città: "Città2",
    cap: "112233",
    descrizione: "Descrizione dell'annuncio 4.",
    immagine: "/images/ad4.jpg",
    prezzo: 120.99,
    categoria: "Libri",
    dataFine: "2024-04-25",
    condizioni: "Nuovo",
  },
  {
    id: 5,
    idUtente: 5,
    titolo: "Annuncio 5",
    strada: "Via Nuova 5",
    città: "Città2",
    cap: "54321",
    descrizione: "Descrizione dell'annuncio 5.",
    immagine: "/images/ad5.jpg",
    prezzo: 65.0,
    categoria: "Elettronica",
    dataFine: "2024-02-28",
    condizioni: "Usato",
  },
  {
    id: 6,
    idUtente: 6,
    titolo: "Annuncio 6",
    strada: "Via Antica 10",
    città: "Città2",
    cap: "112233",
    descrizione: "Descrizione dell'annuncio 6.",
    immagine: "/images/ad6.jpg",
    prezzo: 95.5,
    categoria: "Abbigliamento",
    dataFine: "2024-03-15",
    condizioni: "Nuovo",
  },
  {
    id: 7,
    idUtente: 2,
    titolo: "Annuncio 7",
    strada: "Via Moderna 3",
    città: "Città2",
    cap: "12345",
    descrizione: "Descrizione dell'annuncio 7.",
    immagine: "/images/ad7.jpg",
    prezzo: 42.75,
    categoria: "Libri",
    dataFine: "2024-04-10",
    condizioni: "Ricondizionato",
  },
  {
    id: 8,
    idUtente: 4,
    titolo: "Smartphone Samsung Galaxy S21",
    strada: "Via Tecnologica 42",
    città: "Città1",
    cap: "98765",
    descrizione: "Vendo smartphone Samsung Galaxy S21 in ottime condizioni.",
    immagine: "/images/ad8.jpg",
    prezzo: 599.99,
    categoria: "Elettronica",
    dataFine: "2024-02-15",
    condizioni: "Usato",
  },
  {
    id: 9,
    idUtente: 7,
    titolo: "Tavolo da Pranzo Moderno",
    strada: "Via Arredamento 13",
    città: "Città1",
    cap: "13579",
    descrizione:
      "Vendo un elegante tavolo da pranzo moderno, perfetto per la tua casa.",
    immagine: "/images/ad9.jpg",
    prezzo: 349.99,
    categoria: "Mobili",
    dataFine: "2024-03-01",
    condizioni: "Nuovo",
  },
  {
    id: 10,
    idUtente: 2,
    titolo: "Giacca in Pelle da Uomo",
    strada: "Via Fashion 7",
    città: "Città2",
    cap: "24680",
    descrizione: "Giacca in pelle da uomo, taglia M, colore nero.",
    immagine: "/images/ad10.jpg",
    prezzo: 89.99,
    categoria: "Abbigliamento",
    dataFine: "2024-04-05",
    condizioni: "Ricondizionato",
  },
  {
    id: 11,
    idUtente: 1,
    titolo: "Libro: Il Signore degli Anelli",
    strada: "Via Libreria 8",
    città: "Città1",
    cap: "54321",
    descrizione:
      "Vendo il classico libro 'Il Signore degli Anelli' in edizione deluxe.",
    immagine: "/images/ad11.jpg",
    prezzo: 29.99,
    categoria: "Libri",
    dataFine: "2024-05-20",
    condizioni: "Nuovo",
  },
];*/

/*const getAllAds = () => {
  return adsData;
};*/

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

/*const getPremiumAds = () => {
  const users = getPremiumUsers();
  return adsData.filter((ad) => users.some((user) => user.id === ad.idUtente));
};*/

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

/*const getAdById = (id) => {
  return adsData.find((ad) => ad.id === id);
}; */

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

/*const getAdsByUserId = (userId) => {
  return adsData.filter((ad) => ad.idUtente === userId);
}; */

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

/*const addAd = (newAdData) => {
  const newAdId = adsData.length + 1;

  const newAd = {
    id: newAdId,
    ...newAdData,
  };

  adsData.push(newAd);

  return newAd;
};*/

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

/*const deleteAdById = (id) => {
  const indexToDelete = adsData.findIndex((ad) => ad.id === id);

  if (indexToDelete !== -1) {
    adsData.splice(indexToDelete, 1);
    return true;
  }

  return false;
}; */

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

/*const modifyAd = (modifiedAd) => {
  const indexToModify = adsData.findIndex((ad) => ad.id === modifiedAd.id);

  if (indexToModify !== -1) {
    deleteAdById(modifiedAd.id);
    adsData.push(modifiedAd);
    return true;
  }

  return false;
};*/

const modifyAd = async (modifiedAd, image) => {
  try {
    const formData = new FormData();
    for (let key in modifiedAd) {
      formData.append(key, modifiedAd[key]);
    }
    formData.append("image", image);
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
