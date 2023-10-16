import React, { useEffect, useState } from "react";
import { axiosGetAdmins } from "../../../hooks/admin/crudAdmin";
import { Table } from "./Table";
import { ButtonAdd } from "./ButtonAdd";
import { Search } from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForward,
  faBackward,
  faFastBackward,
  faFastForward
} from "@fortawesome/free-solid-svg-icons";
import { DivPages, ContentPages, DivButtonPages, DivGrupPage } from "../../../components/reusable/DivPages";
import { Section } from "../../../components/reusable/global";


const Admins = () => {
  const tableHeader = ["Nombres", "Apellidos", "Email", "Activo"];

  const [tBody, setTBody] = useState([]);
  const [error, setTError] = useState("");

  // * Formulario
  const [errorForm, setErrorForm] = useState({
    nameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
    isActiveError: "",
  });
  // * Formulario
  
  // * Páginado
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  
  const firstPages = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const prev = (e) => {
    e.preventDefault();
    setPage(page > 1 ? page - 1 : 1);
  };
  
  const next = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  const lastPages = (e) => {
    e.preventDefault();
    setPage(totalPages);
  };
  //* Paginado

  useEffect(() => {
    axiosGetAdmins(setTBody, setTotalPages, page, limit);
  }, [page, limit]);

  return (
    <Section>
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
            <button onClick={(e) => firstPages(e)} disabled={page <= 1}>
              <FontAwesomeIcon icon={faFastBackward} />
            </button>
          </DivButtonPages>
          <DivButtonPages>
            <button onClick={(e) => prev(e)} disabled={page <= 1}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
          </DivButtonPages>
          <DivPages>
            {`Página: ${page}/${totalPages}`}
          </DivPages>
          <DivButtonPages>
            <button onClick={(e) => next(e)} disabled={page >= totalPages}>
              <FontAwesomeIcon icon={faForward} />
            </button>
          </DivButtonPages>
          <DivButtonPages>
            <button onClick={(e) => lastPages(e)} disabled={page >= totalPages}>
            <FontAwesomeIcon icon={faFastForward} />
            </button>
          </DivButtonPages>
        </DivGrupPage>
      </ContentPages>
      <Search setTBody={setTBody} setTotalPages={setTotalPages} page={page} limit={limit} />
    </Section>
  );
};

export default Admins;
