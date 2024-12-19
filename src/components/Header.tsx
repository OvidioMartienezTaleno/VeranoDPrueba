import React from "react";

const Header: React.FC = () => (
  <header>
    <h1>Game Saver Central</h1>
    <p>Encuentra las mejores ofertas!</p>
    <nav>
      <ul className="nav-links">
        <li>
          <a href="#search">Buscar</a>
        </li>
        <li>
          <a href="#stores">Tiendas</a>
        </li>
        <li>
          <a href="#full-list">Lista Completa</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
