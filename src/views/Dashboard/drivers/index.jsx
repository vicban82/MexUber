import React, { useEffect, useState } from "react";
import { axiosGetDrivers } from "../../../hooks/drivers/crudDrivers";
import { headers } from "../../../tools/accessToken";
import { Table } from "./Table";
import { ButtonAdd } from "./ButtonAdd";
import { Search } from "./Search";

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
    driverLicenseNumber: "", //* NUMERO LICENCIA DEL CONDUCTOR
    dateLicense: "", // FECHA - VIGENCIA DE LA LICENCIA
    stateLicense: "", // ESTADO DE LA LICENCIA
    typeLicense: "", // TIPO LICENCIA
    frontLicensePicture: "", //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture: "", //* FOTO REVERSO DE LA LICENCIA
    password: "",
    repeatPassword: "",
    isActive: 0 || 1,
    messageReasonInActive: "", // MENSAJE RASON INACTIVO
    tokenNotification: "", //? OPCIONAL
    typePhone: "", //? OPCIONAL iOS || Android
    services: "", // TODOS - LGBQT+ - MUJERES
    car: "" || null,
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
    axiosGetDrivers(setTDriver, headers);
  }, []);

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
    </section>
  );
};
