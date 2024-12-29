import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Modal from "./components/Modal/Modal";
import { Game } from "./types/Game";
import { fetchGames } from "./services/api"; // Función que obtiene los juegos desde la API
import SearchPage from "./pages/SearchPage"; // Importa la nueva página

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    const getGames = async () => {
      const data = await fetchGames();
      setGames(data);
    };
    getGames();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home games={games} onGameClick={setSelectedGame} />}
          />
          <Route path="/search" element={<SearchPage />} />{" "}
          {/* Ruta para la página de búsqueda */}
        </Routes>

        {selectedGame && (
          <Modal game={selectedGame} onClose={() => setSelectedGame(null)} />
        )}
      </div>
    </Router>
  );
};

export default App;
