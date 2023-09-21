import React, { useEffect, useState } from "react";
import { axiosGetAdmins } from "../../../hooks/admin/crudAdmin";
import { Table } from "./Table";
import { ButtonAdd } from "./ButtonAdd";

const Admins = () => {
  const tableHeader = ["Nombre completo", "Email", "Activo"];

  const [tBody, setTBody] = useState([]);
  const [error, setTError] = useState("");

  useEffect(() => {
    axiosGetAdmins(setTBody, setTError);
  }, []);
  
  // function handleClick(e) {
  //   e.preventDefault();
  //   axiosGetAdmins(setTBody, setTError);
  // }

  return (
    <section>
      <Table
        tHeader={tableHeader}
        tBody={tBody}
        setTBody={setTBody}
        error={error}
        setTError={setTError}
      />
      <ButtonAdd
        tBody={tBody}
        setTBody={setTBody}
        tHeader={tableHeader}
        setTError={setTError}
      />
      {/* <div>
        <button onClick={(e) => handleClick(e)} >
          CARGAR INFORMACION
        </button>
      </div> */}
    </section>
  );
};

export default Admins;
