// src/components/Header/Header.tsx
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <header>
    <h1>Game Saver Central</h1>
    <p>Encuentra las mejores ofertas!</p>
    <nav>
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/search">Buscar</Link>
        </li>
        <li>
          <Link to="/stores">Tiendas</Link>
        </li>
        <li>
          <Link to="/full-list">Lista Completa</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
