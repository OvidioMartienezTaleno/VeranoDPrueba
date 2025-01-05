// src/pages/Home.tsx
import React from "react";
import GamesList from "../components/GamesList/GamesList";
import { Game } from "../types/Game";

interface HomeProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

const Home: React.FC<HomeProps> = ({ games, onGameClick }) => (
  <div className="home-page">
    <h1 className="h1Steam">The best of Steam</h1>
    <GamesList games={games} onGameClick={onGameClick} />
  </div>
);

export default Home;
