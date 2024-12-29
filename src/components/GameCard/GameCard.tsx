import React from "react";
import { Game } from "../../types/Game";
import { useTranslation } from "react-i18next";

interface GameCardProps {
  game: Game;
  onClick: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="game" onClick={onClick}>
      <img src={game.thumb} alt={game.title} />
      <h3>{game.title}</h3>
      <p>
        {t("normalPrice")}: ${game.normalPrice}
      </p>
      <p className="price">
        {t("salePrice")}: ${game.salePrice}
      </p>
    </div>
  );
};

export default GameCard;
