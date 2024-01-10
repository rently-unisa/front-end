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

const getPremiumUsers = () => {
  return usersData.filter((user) => user.premium === true);
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

const deleteUserById = (idDeleteUser) => {
  const indexToDelete = usersData.findIndex((user) => user.id === idDeleteUser);
  if (indexToDelete !== -1) {
    usersData.splice(indexToDelete, 1);
  }
};

const modifyUser = (newUserData) => {
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
};

export {
  getAllUsers,
  getPremiumUsers,
  getUserByUsernameAndPassword,
  getUserByEmailAndPassword,
  getUserById,
  getUserByUsername,
  addUser,
  deleteUserById,
  modifyUser,
};
