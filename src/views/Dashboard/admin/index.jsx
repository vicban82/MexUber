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
            <button onClick={(e) => prev(e)} disabled={page <= 1}>
              <FontAwesomeIcon icon={faFastBackward} />{/* {"<-- PREV"} */}
            </button>
          </DivButtonPages>
          <DivButtonPages>
            <button onClick={(e) => prev(e)} disabled={page <= 1}>
              <FontAwesomeIcon icon={faBackward} />{/* {"<-- PREV"} */}
            </button>
          </DivButtonPages>
          <DivPages>
            {`Página: ${page}/${page}`}
          </DivPages>
          <DivButtonPages>
            <button onClick={(e) => next(e)} disabled={tBody.length <= 1}>
              <FontAwesomeIcon icon={faForward} />
            </button>
          </DivButtonPages>
          <DivButtonPages>
            <button onClick={(e) => next(e)} disabled={tBody.length <= 1}>
            <FontAwesomeIcon icon={faFastForward} />{/* {"<-- PREV"} */} {/* {"NEXT -->"} */}
            </button>
          </DivButtonPages>
        </DivGrupPage>
      </ContentPages>
      <Search setTBody={setTBody} page={page} limit={limit} />
    </section>
  );
};

export default Admins;
