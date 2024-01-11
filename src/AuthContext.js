import { createContext, useContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Verifica la presenza di un cookie di autenticazione al caricamento della pagina
  useEffect(() => {
    const savedUsername = Cookies.get("username");
    if (savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);

    // Salva il nome utente nel cookie di autenticazione
    Cookies.set("username", user.username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");

    // Rimuovi il cookie di autenticazione al logout
    Cookies.remove("username");
  };

  const contextValue = useMemo(
    () => ({ isLoggedIn, username, login, logout }),
    [isLoggedIn, username]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
