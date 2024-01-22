import { createContext, useContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [daltonico, setDaltonico] = useState(false);

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
    Cookies.set("username", user.username);
    Cookies.set("id", user.id);
    Cookies.set("token", user.token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");

    Cookies.remove("username");
    Cookies.remove("id");
    Cookies.remove("token");
  };

  const toggleDaltonico = () => {
    setDaltonico(!daltonico);
  };

  const contextValue = useMemo(
    () => ({ isLoggedIn, username, daltonico, login, logout, toggleDaltonico }),
    [isLoggedIn, username, daltonico]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
