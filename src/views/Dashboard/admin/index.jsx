import React, { useEffect, useState } from "react";
import { axiosGetAdmins } from "../../../hooks/admin/crudAdmin";
import { Table } from "./Table";
import { ButtonAdd } from "./ButtonAdd";
import { Search } from "./Search";
import { DivPages, ContentPages, DivButtonPages, PageButton, DivGrupPage } from "../../../components/reusable/DivPages";


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
      <ContentPages>
        <DivGrupPage>
          <DivButtonPages>
            <PageButton onClick={(e) => prev(e)} disabled={page <= 1}>
              {"<-- PREV"}
            </PageButton>
          </DivButtonPages>
          <DivPages>
            <p>{`Página: ${page}/${page}`}</p>
          </DivPages>
          <DivButtonPages>
            <PageButton onClick={(e) => next(e)} disabled={tBody.length <= 1}>
              {"NEXT -->"}
            </PageButton>
          </DivButtonPages>
        </DivGrupPage>
      </ContentPages>
      <Search setTBody={setTBody} page={page} limit={limit} />
    </section>
  );
};

export default Admins;
