import { createContext, useContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [idUsername, setIdUsername] = useState();

  useEffect(() => {
    const savedUsername = Cookies.get("username");
    if (savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }

    const savedId = Cookies.get("idUsername");
    if (savedId) {
      setIdUsername(savedId);
    }
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUsername(user.username);
    setIdUsername(user.id);
    console.log(user);
    Cookies.set("username", user.username);
    Cookies.set("id", user.id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setIdUsername(null);

    Cookies.remove("username");
    Cookies.remove("idUsername");
  };

  const contextValue = useMemo(
    () => ({ isLoggedIn, username, idUsername, login, logout }),
    [isLoggedIn, username, idUsername]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
