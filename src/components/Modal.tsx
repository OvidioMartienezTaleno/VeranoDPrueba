import React from "react";
import { Game } from "../types/Game";

interface ModalProps {
  game: Game;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ game, onClose }) => (
  <>
    <div className="overlay" onClick={onClose}></div>
    <div className="modal">
      <button className="modal-close" onClick={onClose}>
        X
      </button>
      <img src={game.thumb} alt={game.title} />
      <h3>{game.title}</h3>
      <p>Precio Normal: ${game.normalPrice}</p>
      <p>Precio de oferta: ${game.salePrice}</p>
      <a
        href={`https://www.cheapshark.com/redirect?dealID=${game.dealID}`}
        target="_blank"
        rel="noopener noreferrer"
        className="button"
      >
        Ver Oferta
      </a>
    </div>
  </>
);

export default Modal;
