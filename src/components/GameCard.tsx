import React from "react";
import { Game } from "../types/Game";

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => (
  <div className="game" onClick={onClick}>
    <img src={game.thumb} alt={game.title} />
    <h3>{game.title}</h3>
    <p>Precio Normal: ${game.normalPrice}</p>
    <p className="price">Precio de oferta: ${game.salePrice}</p>
  </div>
);

export default GameCard;
