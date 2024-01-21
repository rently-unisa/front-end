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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
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
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
  },
  {
    id: 13,
    dataInizio: "2023-10-10",
    dataFine: "2023-10-15",
    dataRichiesta: "2023-10-03",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "IN CORSO",
    prezzoTotale: 280.5,
    idAnnuncio: 3,
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
  },
  {
    id: 14,
    dataInizio: "2023-10-10",
    dataFine: "2023-10-15",
    dataRichiesta: "2023-10-03",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "IN CORSO",
    prezzoTotale: 280.5,
    idAnnuncio: 3,
    valutazioneAlNoleggiante: false,
    valutazioneAnnuncio: false,
    valutazioneAlNoleggiatore: false,
  },
  {
    id: 15,
    dataInizio: "2023-10-10",
    dataFine: "2023-10-15",
    dataRichiesta: "2023-10-03",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "CONCLUSOCONVALUTAZIONE",
    prezzoTotale: 280.5,
    idAnnuncio: 3,
    valutazioneAlNoleggiante: true,
    valutazioneAnnuncio: true,
    valutazioneAlNoleggiatore: true,
  },
  {
    id: 16,
    dataInizio: "2023-10-10",
    dataFine: "2023-10-15",
    dataRichiesta: "2023-10-03",
    noleggiante: 1,
    noleggiatore: 2,
    stato: "CONCLUSOCONVALUTAZIONE",
    prezzoTotale: 280.5,
    idAnnuncio: 3,
    valutazioneAlNoleggiante: true,
    valutazioneAnnuncio: true,
    valutazioneAlNoleggiatore: true,
  },
];

/*const getRentalById = (rentalId) => {
  return rentalsData.find((rental) => rental.id === rentalId);
};*/

const getRentalById = async (rentalId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/visualizza-noleggio?idNoleggio=${rentalId}`
    );

    return response;
  } catch (error) {
    console.error(
      "Errore durante la richiesta del profilo utente:",
      error.message
    );
  }
};

//Manca il backend

/*const getRentalsByNoleggiante = (noleggianteId) => {
  return rentalsData.filter(
    (rental) =>
      rental.noleggiante === noleggianteId &&
      [
        "INIZIO",
        "IN CORSO",
        "FINE",
        "CONCLUSIONE",
        "CONCLUSOCONVALUTAZIONE",
      ].includes(rental.stato)
  );
};*/

const getRentalsByNoleggiante = async (noleggianteId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/noleggiante?idUtente=${noleggianteId}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    return "Noleggi non recuperati";
  }
};

/*const getRentalsByNoleggiatore = (noleggiatoreId) => {
  return rentalsData.filter(
    (rental) =>
      rental.noleggiatore === noleggiatoreId &&
      [
        "INIZIO",
        "IN CORSO",
        "FINE",
        "CONCLUSIONE",
        "CONCLUSOCONVALUTAZIONE",
      ].includes(rental.stato)
  );
};*/

const getRentalsByNoleggiatore = async (noleggiatoreId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/noleggiatore?idUtente=${noleggiatoreId}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    return "Noleggi non recuperati";
  }
};

/*const getRentalsRequestsByNoleggiante = (noleggianteId) => {
  return rentalsData.filter(
    (rental) =>
      rental.noleggiante === noleggianteId &&
      ["ACCETTATA", "RICHIESTA", "RIFIUTATA"].includes(rental.stato)
  );
};*/

const getRentalsRequestsByNoleggiante = async (noleggianteId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/richieste/noleggiante?idUtente=${noleggianteId}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    return "Noleggi non recuperati";
  }
};

/*const getRentalsRequestsByNoleggiatore = (noleggiatoreId) => {
  return rentalsData.filter(
    (rental) =>
      rental.noleggiatore === noleggiatoreId &&
      ["ACCETTATA", "RICHIESTA"].includes(rental.stato)
  );
};*/

const getRentalsRequestsByNoleggiatore = async (noleggiatoreId) => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/noleggio/richieste/noleggiatore?idUtente=${noleggiatoreId}`,
      {
        method: "GET",
      }
    );

    return response;
  } catch (error) {
    return "Noleggi non recuperati";
  }
};

/*const addRental = (newRental) => {
  rentalsData.push(newRental);
};*/

const addRental = async (newRental) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/noleggio/aggiungi-noleggio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

/*const modifyRental = (modifiedRental) => {
  deleteRentalById(modifiedRental.id);
  rentalsData.push(modifiedRental);
};*/

const modifyRental = async (modifiedRental) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/noleggio/salva-noleggio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

const deleteRentalById = (rentalId) => {
  console.log(rentalsData);
  const index = rentalsData.findIndex((rental) => rental.id === rentalId);
  if (index !== -1) {
    rentalsData.splice(index, 1);
  }
  console.log(rentalsData);
};

export {
  getRentalById,
  getRentalsByNoleggiante,
  getRentalsByNoleggiatore,
  getRentalsRequestsByNoleggiante,
  getRentalsRequestsByNoleggiatore,
  addRental,
  modifyRental,
  deleteRentalById,
};
