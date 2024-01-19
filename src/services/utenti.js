const usersData = [
  {
    id: 1,
    nome: "Nome1",
    cognome: "Cognome1",
    email: "email1@example.com",
    password: "password1",
    username: "username1",
    premium: false,
  },
  {
    id: 2,
    nome: "Nome2",
    cognome: "Cognome2",
    email: "email2@example.com",
    password: "password2",
    username: "username2",
    premium: true,
  },
  {
    id: 3,
    nome: "John",
    cognome: "Doe",
    email: "john.doe@example.com",
    password: "securepassword1",
    username: "johndoe",
    premium: false,
  },
  {
    id: 4,
    nome: "Alice",
    cognome: "Smith",
    email: "alice.smith@example.com",
    password: "securepassword2",
    username: "alicesmith",
    premium: true,
  },
  {
    id: 5,
    nome: "Bob",
    cognome: "Johnson",
    email: "bob.johnson@example.com",
    password: "securepassword3",
    username: "bobjohnson",
    premium: false,
  },
  {
    id: 6,
    nome: "Eva",
    cognome: "Williams",
    email: "eva.williams@example.com",
    password: "securepassword4",
    username: "evawilliams",
    premium: true,
  },
  {
    id: 7,
    nome: "David",
    cognome: "Miller",
    email: "david.miller@example.com",
    password: "securepassword5",
    username: "davidmiller",
    premium: false,
  },
  {
    id: 8,
    nome: "Sophia",
    cognome: "Brown",
    email: "sophia.brown@example.com",
    password: "securepassword6",
    username: "sophiabrown",
    premium: true,
  },
];

const getAllUsers = () => {
  return usersData;
};

const getPremiumUsers = () => {
  return usersData.filter((user) => user.premium === true);
};

/*const getUserByEmailAndPassword = (email, password) => {
  return usersData.find(
    (user) => user.email === email && user.password === password
  );
};*/

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

/*const getUserById = (id) => {
  return usersData.find((user) => user.id === id);
};*/

const getUserById = async (id) => {
  try {
    const response = await fetch(
      `http://localhostù:4000/api/area-personale/profilo-utente?id=${id}`,
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

const getUserByUsername = (username) => {
  return usersData.find((user) => user.username === username);
};

const getUserByEmail = (email) => {
  return usersData.find((user) => user.email === email);
};

/*const addUser = (newUserData) => {
  const userExists = usersData.some(
    (user) =>
      user.email === newUserData.email || user.username === newUserData.username
  );

  if (!userExists) {
    const newUserId = usersData.length + 1;

    const newUser = {
      id: newUserId,
      ...newUserData,
    };

    usersData.push(newUser);

    return newUser;
  } else {
    return null;
  }
};*/

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

const deleteUserById = (idDeleteUser) => {
  const indexToDelete = usersData.findIndex((user) => user.id === idDeleteUser);
  if (indexToDelete !== -1) {
    usersData.splice(indexToDelete, 1);
  }
};

/*const modifyUser = (newUserData) => {
  const duplicateUsers = usersData.filter(
    (user) =>
      user.id !== newUserData.id &&
      (user.email === newUserData.email ||
        user.username === newUserData.username)
  );

  if (duplicateUsers.length === 0) {
    deleteUserById(newUserData.id);

    usersData.push(newUserData);
    return true;
  } else {
    return false;
  }
};*/

const modifyUser = async (newUserData) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/area-personale/modifica-dati-utente",
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
      "Errore durante la richiesta di modifica dell'utente:",
      error.message
    );
    return "Modifica non riuscita";
  }
};

export {
  getAllUsers,
  getPremiumUsers,
  getUserByEmailAndPassword,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  addUser,
  deleteUserById,
  modifyUser,
};
