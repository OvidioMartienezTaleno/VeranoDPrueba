import React, { useState, useEffect } from "react";
import "./Stores.css";
import { useTranslation } from "react-i18next";

interface Game {
  gameID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  storeID: string;
  thumb: string;
  dealID: string;
}

interface Store {
  storeID: string;
  storeName: string;
}

const Stores: React.FC = () => {
    const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar las tiendas disponibles al montar el componente
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          "https://www.cheapshark.com/api/1.0/stores"
        );
        if (!response.ok) {
          throw new Error("Error al obtener las tiendas.");
        }
        const data: Store[] = await response.json();
        setStores(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchStores();
  }, []);

  // Buscar juegos basados en los filtros
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      let endpoint = `https://www.cheapshark.com/api/1.0/deals?title=${encodeURIComponent(
        searchTerm
      )}`;
      if (selectedStore) {
        endpoint += `&storeID=${selectedStore}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(t("apiFetchError"));
      }

      const data: Game[] = await response.json();
      setGames(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

  return (
    <div className="store-filter-container">
      <h2 className="store-filter-h2">{t("seachStore")}</h2>  
      <div className="store-filter-bar">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="store-filter-input"
          onKeyPress={handleKeyPress}
        />
        <select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
          className="store-filter-select"
        >
          <option value="">{t("allStores")}</option>
          {stores.map((store) => (
            <option key={store.storeID} value={store.storeID}>
              {store.storeName}
            </option>
          ))}
        </select>
        <button onClick={handleSearch} className="store-filter-button">
        {t("searchButton")}
        </button>
      </div>
      <div className="store-results">
        {loading && <p>{t("loading")}</p>}
        {error && <p className="error-message">{error}</p>}
        {games.length === 0 && !loading && !error && (
          <p>{t("noGames")}</p>   
        )}
        {games.map((game) => (
          <div key={game.gameID} className="game-item">
            <img src={game.thumb} alt={game.title} className="game-thumb" />
            <h3>{game.title}</h3>
            <p>
              {t("price")}<strong>${game.salePrice}</strong>{" "}
              <span className="normal-price">(${game.normalPrice})</span>
            </p>
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="game-link"
            >
              {t("seeStore")}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;
