const noleggiData = [
  {
    id: 1,
    dataInizio: "2024-01-10",
    dataFine: "2024-01-14",
    dataRichiesta: "2024-01-05",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "accettato",
    idAnnuncio: 1,
  },
  {
    id: 2,
    dataInizio: "2024-01-25",
    dataFine: "2024-01-30",
    dataRichiesta: "2024-01-20",
    noleggiante: 2,
    noleggiatore: 1,
    stato: "in attesa",
    idAnnuncio: 2,
  },
  {
    id: 3,
    dataInizio: "2024-03-01",
    dataFine: "2024-03-05",
    dataRichiesta: "2024-02-25",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "accettato",
    idAnnuncio: 3,
  },
  {
    id: 4,
    dataInizio: "2024-04-20",
    dataFine: "2024-04-24",
    dataRichiesta: "2024-04-15",
    noleggiante: 2,
    noleggiatore: 1,
    stato: "in attesa",
    idAnnuncio: 4,
  },
  {
    id: 5,
    dataInizio: "2024-02-23",
    dataFine: "2024-02-27",
    dataRichiesta: "2024-02-18",
    noleggiante: 2,
    noleggiatore: 1,
    stato: "accettato",
    idAnnuncio: 5,
  },
  {
    id: 6,
    dataInizio: "2024-03-10",
    dataFine: "2024-03-14",
    dataRichiesta: "2024-03-05",
    noleggiante: 2,
    noleggiatore: 1,
    stato: "in attesa",
    idAnnuncio: 6,
  },
  {
    id: 7,
    dataInizio: "2024-04-05",
    dataFine: "2024-04-09",
    dataRichiesta: "2024-03-31",
    noleggiante: 2,
    noleggiatore: 1,
    stato: "accettato",
    idAnnuncio: 7,
  },
];

const getAllNoleggi = () => {
  return noleggiData;
};

const getNoleggioById = (id) => {
  return noleggiData.find((noleggio) => noleggio.id === id);
};

const getNoleggiByUserId = (userId) => {
  return noleggiData.filter(
    (noleggio) =>
      noleggio.noleggiante === userId || noleggio.noleggiatore === userId
  );
};

const getNoleggiByAnnuncioId = (annuncioId) => {
  return noleggiData.filter((noleggio) => noleggio.idAnnuncio === annuncioId);
};

const addNoleggio = (newNoleggioData) => {
  const newNoleggioId = noleggiData.length + 1;

  const newNoleggio = {
    id: newNoleggioId,
    ...newNoleggioData,
  };

  noleggiData.push(newNoleggio);

  return newNoleggio;
};

export {
  getAllNoleggi,
  getNoleggioById,
  getNoleggiByUserId,
  getNoleggiByAnnuncioId,
  addNoleggio,
};
