import React from "react";
import { Game } from "../../types/Game";
import { useTranslation } from "react-i18next";

interface ModalProps {
  game: Game;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ game, onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <img src={game.thumb} alt={game.title} />
        <h3>{game.title}</h3>
        <p>
          {t("normalPrice")}: ${game.normalPrice}
        </p>
        <p>
          {t("salePrice")}: ${game.salePrice}
        </p>
        <p>
          {t("rating")}: {game.dealRating}
        </p>
        <p className="ahorro">
          {t("savings")}: {game.savings}
        </p>
        <a
          href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          {t("viewDeal")}
        </a>
      </div>
    </>
  );
};

export default Modal;
