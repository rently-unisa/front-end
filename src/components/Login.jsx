import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getUserByUsernameAndPassword } from "../services/utenti";
import { getUserByEmailAndPassword } from "../services/utenti";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    var user = getUserByUsernameAndPassword(username, password);
    debugger;
    if (user) {
      login(user);
      navigate("/");
    } else {
      user = getUserByEmailAndPassword(username, password);
      if (user) {
        login(user);
        navigate("/");
      } else {
        alert("Credenziali non valide");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
