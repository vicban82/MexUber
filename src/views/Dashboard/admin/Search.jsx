import React, { useState } from 'react'

export const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search); // Pasar el término de búsqueda al componente principal
    setSearch(""); // Limpiar el término de búsqueda
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLoadAll = (e) => {
    e.preventDefault();
    onSearch(""); // Limpiar el término de búsqueda para cargar todos los administradores
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} >
        <div>
          <input 
            type="text"
            value={search}
            placeholder='Buscar...'
            onChange={(e) => handleInputChange(e)}
          />
          <button type='submit' >Buscar</button>
          <button onClick={(e) => handleLoadAll(e)} >Cargar todos</button>
        </div>
      </form>
    </div>
  );
}
