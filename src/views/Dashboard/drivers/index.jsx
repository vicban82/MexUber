import React, { useEffect, useState } from "react";
import { axiosGetDrivers } from "../../../hooks/drivers/crudDrivers";
import { headers } from "../../../tools/accessToken";
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

export const Drivers = () => {
  const tableHeader = ["Nombres", "Apellidos", "Correo", "Teléfono", "Activo", "Vehículo"];

  const [tDriver, setTDriver] = useState([]);

  //* ESTADO DEL FORMULARIO
  const [driver, setDriver] = useState({
    name: "",
    lastName: "",
    zipCode: "", // CODIGO POSTAL
    state: "", // ESTADO DE MEXICO
    city: "",
    colonia: "",
    address: "",
    contact: "", // NUMERO DE CONTACTO DEL CONDUCTOR
    email: "",
    driverPicture: "", //* FOTO DEL CONDUCTOR
    //! DATOS DE LA LICENCIA DE CONDUCCION
    driverLicenseNumber: "", //* NUMERO LICENCIA DEL CONDUCTOR
    stateLicense: "", // ESTADO DE LA LICENCIA
    typeLicense: "", // TIPO LICENCIA
    dateLicense: "", // FECHA - VIGENCIA DE LA LICENCIA
    frontLicensePicture: "", //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture: "", //* FOTO REVERSO DE LA LICENCIA
    //! DATOS DE LA LICENCIA DE CONDUCCION
    //! AJUSTES DE LA APLICACION
    allServices: 1, // TODOS
    servicesLGBQT: 0, // LGBQT+
    onlyWomenServices: 0, // MUJERES
    //! AJUSTES DE LA APLICACION
    //! ACCESO A LA APLICACION
    password: "",
    repeatPassword: "",
    isActive: 1,
    messageReasonInActive: "", // MENSAJE RASON INACTIVO
    //! ACCESO A LA APLICACION
    // car: "" || null,
  });
  const [errorForm, setErrorForm] = useState({
    nameError: "",
    lastNameError: "",
    zipCodeError: "",
    stateError: "",
    cityError: "",
    coloniaError: "",
    addressError: "",
    contactError: "",
    emailError: "",
    driverPictureError: "",
    driverLicenseNumberError: "",
    stateLicenseError: "",
    typeLicenseError: "",
    dateLicenseError: "",
    frontLicensePictureError: "",
    backLicensePictureError: "",
    servicesError: "",
    passwordError: "",
    repeatPasswordError: "",
    isActiveError: "",
    messageReasonInActiveError: "",
  });
  //* ESTADO DEL FORMULARIO
  
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
    axiosGetDrivers(setTDriver, setTotalPages, headers, page, limit);
  }, [page, limit]);

  return (
    <section>
      {tDriver.length === 0 ? (
        <p>En esta sección no hay información disponible</p>
      ) : (
        <>
          <Search setTDriver={setTDriver} setTotalPages={setTotalPages} page={page} limit={limit} />
          <ButtonAdd
            tDriver={tDriver}
            setTDriver={setTDriver}
            driver={driver}
            setDriver={setDriver}
            errorForm={errorForm}
            setErrorForm={setErrorForm}
          />
          <Table
            tHeader={tableHeader}
            tDriver={tDriver}
            setTDriver={setTDriver}
            driver={driver}
            setDriver={setDriver}
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
                  <FontAwesomeIcon icon={faForward} />
                </button>
              </DivButtonPages>
            </DivGrupPage>
          </ContentPages >
        </>
      )}
    </section>
  );
};
