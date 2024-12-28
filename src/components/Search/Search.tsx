import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void; // Función que ejecuta la búsqueda
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm); // Ejecutar búsqueda
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualizar estado
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default Search;
