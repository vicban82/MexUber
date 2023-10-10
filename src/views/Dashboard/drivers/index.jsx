import React, { useEffect, useState } from "react";
import { axiosGetDrivers } from "../../../hooks/drivers/crudDrivers";
import { headers } from "../../../tools/accessToken";
import { Table } from "./Table";
import { ButtonAdd } from "./ButtonAdd";
import { Search } from "./Search";
import { DivPages } from "../../../components/reusable/global";

export const Drivers = () => {
  const tableHeader = [
    "Nombres",
    "Apellidos",
    "Correo",
    "Teléfono",
    "Activo",
    "Vehículo",
  ];
  const [tDriver, setTDriver] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  // ESTADO DEL FORMULARIO
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
    services: "", // TODOS - LGBQT+ - MUJERES
    //! AJUSTES DE LA APLICACION
    //! ACCESO A LA APLICACION
    password: "",
    repeatPassword: "",
    isActive: 0 || 1,
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
    dateLicenseError: "",
    stateLicenseError: "",
    typeLicenseError: "",
    frontLicensePictureError: "",
    backLicensePictureError: "",
    passwordError: "",
    repeatPasswordError: "",
    isActiveError: "",
    messageReasonInActiveError: "",
    servicesError: "",
  });
  useEffect(() => {
    axiosGetDrivers(setTDriver, headers, page, limit);
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
      <Search setTDriver={setTDriver} />
      <Table
        tHeader={tableHeader}
        tDriver={tDriver}
        setTDriver={setTDriver}
        driver={driver}
        setDriver={setDriver}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
      />
      <ButtonAdd
        tDriver={tDriver}
        setTDriver={setTDriver}
        driver={driver}
        setDriver={setDriver}
        errorForm={errorForm}
        setErrorForm={setErrorForm}
      />
      <DivPages>
        <button onClick={(e) => prev(e)} disabled={page <= 1}>
          {"<-- PREV"}
        </button>
        <p>{`Página: ${page}/${page}`}</p>
        <button onClick={(e) => next(e)} disabled={tDriver.length < limit}>
          {"NEXT -->"}
        </button>
      </DivPages>
    </section>
  );
};
