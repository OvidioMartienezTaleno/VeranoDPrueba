import React, { useState } from "react";
import "../App.css"; // Si usas un archivo CSS específico para la página

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container">
      <h2>Buscar Juegos</h2>
      <input
        type="text"
        placeholder="Escribe para buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button>Buscar</button>
    </div>
  );
};

export default SearchPage;
