import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import "../../css/Header.css"; // Archivo CSS para los estilos del Header

const Header: React.FC = () => {
  const { t } = useTranslation();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redireccionar a la página de inicio de sesión después de cerrar sesión
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <header>
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">{t("home")}</Link>
          </li>
          <li>
            <Link to="/search">{t("search")}</Link>
          </li>
          <li>
            <Link to="/stores">{t("stores")}</Link>
          </li>
          <li>
            <Link to="/full-list">{t("fullList")}</Link>
          </li>
          <li>
            <Link to="/search-games">{t("searchDetailsGames")}</Link>
          </li>
          <li>
            <button onClick={handleSignOut} className="nav-link-button">
              {t("signOut")}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
