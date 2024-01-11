const rentalsData = [
  {
    id: 1,
    dataInizio: "2023-01-15",
    dataFine: "2023-01-20",
    dataRichiesta: "2023-01-10",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "RICHIESTA",
    prezzoTotale: 150.5,
    idAnnuncio: 1,
  },
  {
    id: 2,
    dataInizio: "2024-02-05",
    dataFine: "2024-02-10",
    dataRichiesta: "2023-01-25",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "ACCETTATA",
    prezzoTotale: 200.75,
    idAnnuncio: 2,
  },
  {
    id: 3,
    dataInizio: "2023-03-12",
    dataFine: "2023-03-18",
    dataRichiesta: "2023-03-05",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "CONCLUSIONE",
    prezzoTotale: 300.2,
    idAnnuncio: 3,
  },
  {
    id: 4,
    dataInizio: "2023-04-20",
    dataFine: "2023-04-25",
    dataRichiesta: "2023-04-15",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "ACCETTATA",
    prezzoTotale: 180.9,
    idAnnuncio: 4,
  },
  {
    id: 5,
    dataInizio: "2023-05-03",
    dataFine: "2023-05-10",
    dataRichiesta: "2023-04-25",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "INIZIO",
    prezzoTotale: 250.0,
    idAnnuncio: 5,
  },
  {
    id: 6,
    dataInizio: "2023-06-08",
    dataFine: "2023-06-15",
    dataRichiesta: "2023-06-01",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "RICHIESTA",
    prezzoTotale: 210.6,
    idAnnuncio: 6,
  },
  {
    id: 7,
    dataInizio: "2023-07-17",
    dataFine: "2023-07-22",
    dataRichiesta: "2023-07-10",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "ACCETTATA",
    prezzoTotale: 180.0,
    idAnnuncio: 7,
  },
  {
    id: 8,
    dataInizio: "2023-08-25",
    dataFine: "2023-08-30",
    dataRichiesta: "2023-08-20",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "CONCLUSIONE",
    prezzoTotale: 320.75,
    idAnnuncio: 3,
  },
  {
    id: 9,
    dataInizio: "2023-09-05",
    dataFine: "2023-09-12",
    dataRichiesta: "2023-08-28",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "INIZIO",
    prezzoTotale: 190.3,
    idAnnuncio: 2,
  },
  {
    id: 10,
    dataInizio: "2023-10-10",
    dataFine: "2023-10-15",
    dataRichiesta: "2023-10-03",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "FINE",
    prezzoTotale: 280.5,
    idAnnuncio: 1,
  },
  {
    id: 11,
    dataInizio: "2023-10-10",
    dataFine: "2023-10-15",
    dataRichiesta: "2023-10-03",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "RIFIUTATA",
    prezzoTotale: 280.5,
    idAnnuncio: 2,
  },
  {
    id: 12,
    dataInizio: "2023-10-10",
    dataFine: "2023-10-15",
    dataRichiesta: "2023-10-03",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "RIFIUTATA",
    prezzoTotale: 280.5,
    idAnnuncio: 3,
  },
];

const getAllRentals = () => {
  return rentalsData;
};

const getRentalById = (rentalId) => {
  return rentalsData.find((rental) => rental.id === rentalId);
};

const addRental = (newRental) => {
  rentalsData.push(newRental);
};

const deleteRentalById = (rentalId) => {
  console.log(rentalsData);
  const index = rentalsData.findIndex((rental) => rental.id === rentalId);
  if (index !== -1) {
    rentalsData.splice(index, 1);
  }
  console.log(rentalsData);
};

const getRentalsByAnnuncioId = (annuncioId) => {
  return rentalsData.filter((rental) => rental.idAnnuncio === annuncioId);
};

const getRentalsByStato = (stato) => {
  return rentalsData.filter((rental) => rental.stato === stato);
};

const getRentalsByDataInizio = (dataInizio) => {
  return rentalsData.filter((rental) => rental.dataInizio === dataInizio);
};

const getRentalsByDataFine = (dataFine) => {
  return rentalsData.filter((rental) => rental.dataFine === dataFine);
};

const getRentalsByNoleggiante = (noleggianteId) => {
  return rentalsData.filter(
    (rental) =>
      rental.noleggiante === noleggianteId &&
      ["INIZIO", "FINE", "CONCLUSIONE"].includes(rental.stato)
  );
};

const getRentalsByNoleggiatore = (noleggiatoreId) => {
  return rentalsData.filter(
    (rental) =>
      rental.noleggiatore === noleggiatoreId &&
      ["INIZIO", "FINE", "CONCLUSIONE"].includes(rental.stato)
  );
};

const getRentalsRequestsByNoleggiante = (noleggianteId) => {
  return rentalsData.filter(
    (rental) =>
      rental.noleggiante === noleggianteId &&
      ["ACCETTATA", "RICHIESTA", "RIFIUTATA"].includes(rental.stato)
  );
};

const getRentalsRequestsByNoleggiatore = (noleggiatoreId) => {
  return rentalsData.filter(
    (rental) =>
      rental.noleggiatore === noleggiatoreId &&
      ["ACCETTATA", "RICHIESTA"].includes(rental.stato)
  );
};

const modifyRental = (modifiedRental) => {
  deleteRentalById(modifiedRental.id);
  rentalsData.push(modifiedRental);
  console.log(modifiedRental);
};

export {
  getAllRentals,
  getRentalsByDataFine,
  getRentalsByDataInizio,
  getRentalById,
  getRentalsByStato,
  getRentalsByAnnuncioId,
  getRentalsByNoleggiante,
  getRentalsByNoleggiatore,
  getRentalsRequestsByNoleggiante,
  getRentalsRequestsByNoleggiatore,
  deleteRentalById,
  addRental,
  modifyRental,
};
