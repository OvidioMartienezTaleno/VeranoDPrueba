import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();

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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
