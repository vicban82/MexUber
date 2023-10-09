import React, { useEffect, useState } from "react";
import { axiosGetAdmins } from "../../../hooks/admin/crudAdmin";
import { Table } from "./Table";
import { ButtonAdd } from "./ButtonAdd";
import { Search } from "./Search";
import { DivPages } from "../../../components/reusable/global";

const Admins = () => {
  const tableHeader = ["Nombres", "Apellidos", "Email", "Activo"];

  const [tBody, setTBody] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [error, setTError] = useState("");
  const [errorForm, setErrorForm] = useState({
    nameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
    isActiveError: "",
  });

  useEffect(() => {
    axiosGetAdmins(setTBody, page, limit);
  }, [page, limit]);

  //* Paginado
  const prev = (e) => {
    e.preventDefault();
    setPage(page > 1 ? page - 1 : 1);
  };

  const next = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  return (
    <section>
      <Search setTBody={setTBody} setTError={setTError} />
      <ButtonAdd
        tBody={tBody}
        setTBody={setTBody}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
      />
      <Table
        tHeader={tableHeader}
        tBody={tBody}
        setTBody={setTBody}
        error={error}
        setTError={setTError}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
      />
      <DivPages>
        <button onClick={(e) => prev(e)} disabled={page <= 1}>
          {"<-- PREV"}
        </button>
        <p>{`Página: ${page}/${page}`}</p>
        <button onClick={(e) => next(e)} disabled={tBody.length < limit}>
          {"NEXT -->"}
        </button>
      </DivPages>
    </section>
  );
};

export default Admins;
