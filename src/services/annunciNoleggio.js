//import { getPremiumUsers } from "./utenti";

const adsData = [
  {
    id: 1,
    idUtente: 1,
    titolo: "Annuncio 1",
    strada: "Via Example 1",
    civico: "123",
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
    civico: "456",
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
    civico: "789",
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
    civico: "101",
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
    civico: "999",
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
    civico: "777",
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
    civico: "888",
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
    civico: "789",
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
    civico: "222",
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
    civico: "777",
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
    civico: "888",
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
];

const getAllAds = () => {
  return adsData;
};

/*const getAllAds = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/ricerca/all`);

    if (response.ok) {
      const ads = await response.json();
      return ads;
    } else {
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Errore durante il recupero degli annunci');
    }
  } catch (error) {
    return null;
  } */

/*const getPremiumAds = () => {
  const users = getPremiumUsers();
  return adsData.filter((ad) => users.some((user) => user.id === ad.idUtente));
};*/

const getPremiumAds = async () => {
  try {
    const response = await fetch(
      `http://79.22.155.129:4000/api/ricerca/premium`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    return "Errore nella richiesta degli annunci";
  }
};

const getAdById = (id) => {
  return adsData.find((ad) => ad.id === id);
};

/*const getAdById = async (id) => {
  try {
    const response = await fetch(
      {
        "http://localhost:8080/api/gestione-annuncio/visualliza-annuncio",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    return response;
  } catch (error) {
    console.error("Errore durante la richiesta di login");
    return "Credenziali non valide";
  }
}; */

const getAdsByUserId = (userId) => {
  return adsData.filter((ad) => ad.idUtente === userId);
};

/*const getAdById = async (id) => {
  try {
    const response = await fetch(
      {
        "http://localhost:8080/api/gestione-annuncio/visualliza-annunci-utente",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

    return response;
  } catch (error) {
    console.error("Errore durante la richiesta di login");
    return "Credenziali non valide";
  }
}; */

const addAd = (newAdData) => {
  const newAdId = adsData.length + 1;

  const newAd = {
    id: newAdId,
    ...newAdData,
  };

  adsData.push(newAd);

  return newAd;
};

/*const addAd = (newAdData) => {
try {
  const response = await fetch('http://localhost:8080/api/gestione-annuncio/aggiungi-annuncio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAdData),
  });

  if (response.ok) {
    const newAd = await response.json();
    return newAd;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'Errore sconosciuto durante la registrazione');
  }
} catch (error) {
  console.error('Errore durante la richiesta di registrazione:', error.message);
  return null;
}
};*/

const deleteAdById = (id) => {
  const indexToDelete = adsData.findIndex((ad) => ad.id === id);

  if (indexToDelete !== -1) {
    adsData.splice(indexToDelete, 1);
    return true;
  }

  return false;
};

const modifyAd = (modifiedAd) => {
  const indexToModify = adsData.findIndex((ad) => ad.id === modifiedAd.id);

  if (indexToModify !== -1) {
    deleteAdById(modifiedAd.id);
    adsData.push(modifiedAd);
    return true;
  }

  return false;
};

/*const modifyAd = async (modifiedAd) => {
  try {
    const duplicateUsersResponse = await fetch('http://localhost:8080/api/gestione-annuncio/modifica-annuncio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(modifiedAd),
    });

    if (duplicateUsersResponse.ok) {
      const successMessage = await duplicateUsersResponse.text();
      console.log(successMessage); // Puoi gestire il messaggio di successo come preferisci
      return true;
    } else {
      const errorMessage = await duplicateUsersResponse.text();
      console.error(errorMessage || 'Errore sconosciuto durante la modifica dell\'utente');
      return false;
    }
  } catch (error) {
    console.error('Errore durante la richiesta di modifica dell\'utente:', error.message);
    return false;
  }
}; */

export {
  getAllAds,
  getPremiumAds,
  getAdById,
  getAdsByUserId,
  addAd,
  deleteAdById,
  modifyAd,
};
