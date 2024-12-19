import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import GamesList from "./components/GamesList";
import Modal from "./components/Modal";
//import Button from "./components/Button";
import { Game } from "./types/Game";
import "./App.css";

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const apiUrl = `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15`;
    try {
      const response = await fetch(apiUrl);
      const data: Game[] = await response.json();
      if (data.length) {
        setGames(data);
      } else {
        console.error(`error`, data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <Header />
      <p className="appp">Lo mejor de Steam</p>
      <div className="container">
        <GamesList games={games} onGameClick={setSelectedGame} />
      </div>

      {selectedGame && (
        <Modal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

export default App;
