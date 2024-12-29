import React, { useState } from "react";
import "../App.css";

interface Game {
  gameID: string;
  external: string; // Nombre del juego
  thumb: string; // URL del logo del juego
  cheapest: string; // Precio más barato
  cheapestDealID: string; // ID del trato más barato
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Término de búsqueda
  const [games, setGames] = useState<Game[]>([]); // Resultados de la búsqueda
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Mensajes de error

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Actualizar el término de búsqueda
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("El término de búsqueda no puede estar vacío.");
      return;
    }

    setError(null);
    setLoading(true);
    setGames([]); // Limpiar resultados anteriores

    try {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/games?title=${searchTerm}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API.");
      }

      const data: Game[] = await response.json();
      setGames(data); // Guardar los resultados en el estado
    } catch (err) {
      setError("Hubo un problema al buscar los juegos. Intenta nuevamente.");
    } finally {
      setLoading(false); // Terminar el estado de carga
    }
  };

  return (
    <div className="search-container">
      <h2>Buscar Juegos</h2>
      <input
        type="text"
        placeholder="Escribe para buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        aria-label="Campo de búsqueda de juegos"
      />
      <button onClick={handleSearch} aria-label="Botón para buscar juegos">
        Buscar
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Cargando...</p>}
      <div className="results">
        {games.map((game) => (
          <div key={game.gameID} className="game-card">
            <img src={game.thumb} alt={game.external} className="game-logo" />
            <div className="game-details">
              <h3 className="game-title">{game.external}</h3>
              <p className="game-price">
                Precio más barato: <strong>${game.cheapest}</strong>
              </p>
            </div>
            <a
              href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="game-link"
            >
              Ver Oferta
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
