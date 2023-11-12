import React, { useState } from 'react'

export const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(search);
    setSearch("");
  }
  
  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  
  function handleClick(e) {
    e.preventDefault();
    onSearch("");
  }

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
          <button onClick={(e) => handleClick(e)} >Cargar todos</button>
        </div>
      </form>
    </div>
  );
}
