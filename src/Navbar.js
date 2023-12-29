import React from 'react';
import logo from './Logo.png';
import search from './search.svg';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div className="navbar">
        <Link className='home' to="/">
          <div className="logo-container">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="brand-name">ently</div>
          </div>
        </Link>
        <div className="menu">
          <div className="menu-item"><Link to="/">Home</Link></div>
          <div className="menu-item"><Link to="/annunci">Annunci</Link></div>
          <div className="menu-item"><Link to="/chi-siamo">Chi Siamo</Link></div>
          <div className="menu-item"><Link to="/segnalazione">Assistenza</Link></div>
          <div className="menu-item"><Link to="/login">Login</Link></div>
          <div className="search-bar">
            <input type="text" placeholder="Cerca nel sito" />
            <img src={search} alt="Search" />
          </div>
        </div>
      </div>
    );
}

export default Navbar;