import { getPremiumUsers } from "./utenti";

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
    idUtente: 1,
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
    idUtente: 2,
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
    idUtente: 2,
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
    idUtente: 2,
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
];

const getAllAds = () => {
  return adsData;
};

const getPremiumAds = () => {
  const users = getPremiumUsers();
  return adsData.filter((ad) => users.some((user) => user.id === ad.idUtente));
};

const getAdById = (id) => {
  return adsData.find((ad) => ad.id === id);
};

const getAdsByUserId = (userId) => {
  return adsData.filter((ad) => ad.idUtente === userId);
};

const addAd = (newAdData) => {
  const newAdId = adsData.length + 1;

  const newAd = {
    id: newAdId,
    ...newAdData,
  };

  adsData.push(newAd);

  return newAd;
};

export { getAllAds, getPremiumAds, getAdById, getAdsByUserId, addAd };
