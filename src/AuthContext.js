import { createContext, useContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

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
    console.log(user);
    Cookies.set("username", user.username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");

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
