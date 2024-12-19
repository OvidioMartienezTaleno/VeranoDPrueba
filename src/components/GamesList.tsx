import React from "react";
import GameCard from "./GameCard";
import { Game } from "../types/Game";

interface GamesListProps {
  games: Game[];
  onGameClick: (game: Game) => void;
}

const GamesList: React.FC<GamesListProps> = ({ games, onGameClick }) => (
  <div className="games-list">
    {games.map((game) => (
      <GameCard
        key={game.dealID}
        game={game}
        onClick={() => onGameClick(game)}
      />
    ))}
  </div>
);

export default GamesList;
