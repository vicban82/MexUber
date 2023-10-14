import React, { useState } from 'react'
import { axiosGetAdmins, axiosSearchAdmins } from '../../../hooks/admin/crudAdmin';
import { headers } from '../../../tools/accessToken';

export const Search = ({ setTBody, setTotalPages, page, limit }) => {
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axiosSearchAdmins(search, setTBody, headers);
    setSearch("");
  }
  
  function handleInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  
  function handleClick(e) {
    e.preventDefault();
    axiosGetAdmins(setTBody, setTotalPages, page, limit);
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
