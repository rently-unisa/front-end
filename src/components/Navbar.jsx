import React from "react";
import logo from "../image/Logo.png";
import search from "../image/search.svg";
import "../style/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userMenu = isLoggedIn ? (
    <div className="user-menu">
      <div className="menu-switch">
        <p className="menu-item">{username}</p>
      </div>
      <div className="dropdown-content">
        <div className="dropdown-style">
          <Link to="/profilo">Area Personale</Link>
          <Link to="/richieste">Le mie richieste</Link>
          <Link to="/annunci">I miei Annunci</Link>
          <Link to="/noleggi">I miei Noleggi</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="menu-item">
      <Link to="/login">Accedi</Link>
    </div>
  );

  return (
    <div className="navbar">
      <Link className="home" to="/">
        <div className="logo-container">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="brand-name">ently</div>
        </div>
      </Link>
      <div className="menu">
        <div className="menu-item">
          <Link to="/">Home</Link>
        </div>
        <div className="menu-item">
          <Link to="/catalogo">Annunci</Link>
        </div>
        <div className="menu-item">
          <Link to="/chi-siamo">Chi Siamo</Link>
        </div>
        <div className="menu-item">
          <Link to="/assistenza">Assistenza</Link>
        </div>
        {userMenu}
        <div className="search-bar">
          <input type="text" placeholder="Cerca nel sito" />
          <img src={search} alt="Search" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
