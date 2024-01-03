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
];

const getAllUsers = () => {
  return usersData;
};

const getUserByUsernameAndPassword = (username, password) => {
  return usersData.find(
    (user) => user.username === username && user.password === password
  );
};

const getUserByEmailAndPassword = (email, password) => {
  return usersData.find(
    (user) => user.email === email && user.password === password
  );
};

const getUserById = (id) => {
  return usersData.find((user) => user.id === id);
};

const getUserByUsername = (username) => {
  return usersData.find((user) => user.username === username);
};

const addUser = (newUserData) => {
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
};

export {
  getAllUsers,
  getUserByUsernameAndPassword,
  getUserByEmailAndPassword,
  getUserById,
  getUserByUsername,
  addUser,
};
