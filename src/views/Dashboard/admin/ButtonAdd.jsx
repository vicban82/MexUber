import React, { useState } from "react";

export const ButtonAdd = ({ tBody, tHeader }) => {
  
  const [admin, setAdmin] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    isActive: '',
  });
  
  function handleChange(e) {
    const { name, value } = e.target.value;
    setAdmin({
      ...admin,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <div>
        <div>
          <h3>Agregar</h3>
          <div>
            {tBody &&
              tHeader.map((item, i) => {
                if (i !== 2) {
                  return (
                    <div key={i}>
                      <label htmlFor={`input-${i}`}>
                        {item}
                      </label>
                      <input
                        id={`input-${i}`}
                        value={admin[i] || ""}
                        onChange={(e) => handleChange(i, e)}
                        type="text"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={i}>
                      <label htmlFor={`input-${i}`}>
                        {item}
                      </label>
                      <input
                        id={`input-${i}`}
                        value={admin[i] || ""}
                        onChange={(e) => handleChange(i, e)}
                        type="checkbox"
                      />
                    </div>
                  );
                }
              })}
          </div>
          <div>
            <label
              htmlFor="my_modal_add"
            >
              Cancelar
            </label>
            <label
              onClick={handleSubmit}
              htmlFor="my_modal_add"
            >
              Guardar
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
