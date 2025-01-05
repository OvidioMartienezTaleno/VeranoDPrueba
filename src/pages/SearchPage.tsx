import React, { useState } from "react";
import "../App.css";
import { useTranslation } from "react-i18next";

interface Game {
  dealID: string;
  title: string; // Nombre del juego
  thumb: string; // URL del logo del juego
  salePrice: string; // Precio más barato
  normalPrice: string; // Precio normal del juego
  savings: string; // Ahorro en el precio
  storeID: string; // ID de la tienda
  storeName: string; // Nombre de la tienda
}

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>(""); // Término de búsqueda
  const [games, setGames] = useState<Game[]>([]); // Resultados de la búsqueda
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Mensajes de error

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Actualizar el término de búsqueda
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError(t("searchEmptyError"));
      return;
    }

    setError(null);
    setLoading(true);
    setGames([]); // Limpiar resultados anteriores

    try {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?upperPrice=15&title=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(t("apiFetchError"));
      }

      const data: Game[] = await response.json();
      const enrichedData: Game[] = await Promise.all(
        data.map(async (game) => {
          const storeResponse = await fetch(
            `https://www.cheapshark.com/api/1.0/stores`
          );
          const stores = await storeResponse.json();
          const store = stores.find(
            (store: { storeID: string }) => store.storeID === game.storeID
          );
          return { ...game, storeName: store.storeName };
        })
      );

      setGames(enrichedData); // Guardar los resultados en el estado
    } catch (err) {
      setError(t("searchFetchError"));
    } finally {
      setLoading(false); // Terminar el estado de carga
    }
  };

  return (
    <div className="search-container">
      <h2>{t("searchGames")}</h2>
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label={t("searchField")}
      />
      <button onClick={handleSearch} aria-label={t("searchButton")}>
        {t("search")}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>{t("loading")}</p>}
      <div className="results">
        {games.map((game) => (
          <div key={game.dealID} className="game-card">
            <img src={game.thumb} alt={game.title} className="game-logo" />
            <div className="game-details">
              <h3 className="game-title">{game.title}</h3>
              <p className="game-price">
                {t("normalPrice")}: <strong>${game.normalPrice}</strong>
              </p>
              <p className="game-price">
                {t("salePrice")}: <strong>${game.salePrice}</strong>
              </p>
              <p className="game-price">
                {t("savings")}:{" "}
                <strong>{parseFloat(game.savings).toFixed(2)}%</strong>
              </p>
              <p className="game-store">
                {t("store")}: <strong>{game.storeName}</strong>
              </p>
            </div>
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="game-link"
            >
              {t("viewDeal")}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
