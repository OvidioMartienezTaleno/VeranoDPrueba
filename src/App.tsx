import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Modal from "./components/Modal/Modal";
import { Game } from "./types/Game";
import { fetchGames } from "./services/api"; // Función que obtiene los juegos desde la API
import SearchPage from "./pages/SearchPage"; // Importa la nueva página
import SearchGames from "./pages/SearchGames"; // Importa la página de búsqueda de juegos
import Stores from "./pages/Stores";


const App: React.FC = () => {
  const { i18n } = useTranslation();
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const getGames = async () => {
      const data = await fetchGames();
      setGames(data);
    };
    getGames();
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="language-switcher">
          <button
            onClick={() => changeLanguage("en")}
            className="language-button"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className="language-button"
          >
            Español
          </button>
        </div>
        <Routes>
          <Route
            path="/"
            element={<Home games={games} onGameClick={setSelectedGame} />}
          />
          <Route path="/search" element={<SearchPage />} />{" "}
          {/* Ruta para la página de búsqueda */}
          <Route path="/search-games" element={<SearchGames />} /> {/* Ruta para buscar juegos */}
          <Route path="/stores" element={<Stores />} /> {/* Ruta para buscar juegos por tiendas*/}
        </Routes>

        {selectedGame && (
          <Modal game={selectedGame} onClose={() => setSelectedGame(null)} />
        )}
      </div>
    </Router>
  );
};

export default App;
