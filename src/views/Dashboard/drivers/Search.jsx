import React, { useState } from 'react'
import { axiosGetDrivers, axiosSearchDrivers } from '../../../hooks/drivers/crudDrivers';
import { headers } from '../../../tools/accessToken';

export const Search = ({ setTDriver }) => {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axiosSearchDrivers(search, setTDriver, headers);
    setSearch("");
  }
  
  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  
  function handleClick(e) {
    e.preventDefault();
    axiosGetDrivers(setTDriver, headers);
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
