import Swal from "sweetalert2";

//* Esta funcion es para la conexion con el Back-End
export function errorRegister(driver, errorForm) {
  const {
    name,
    lastName,
    zipCode, // CODIGO POSTAL
    state, // ESTADO DE MEXICO
    city,
    colonia,
    address,
    contact, // NUMERO DE CONTACTO DEL CONDUCTOR
    email,
    driverPicture, //* FOTO DEL CONDUCTOR
    driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
    dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
    stateLicense, // ESTADO DE LA LICENCIA
    typeLicense, // TIPO LICENCIA
    frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
    password,
    repeatPassword,
    isActive,
    messageReasonInActive, // MENSAJE RASON INACTIVO
    services, // TODOS - LGBQT+ - MUJERES
  } = driver;

  const {
    nameError,
    lastNameError,
    zipCodeError,
    stateError,
    cityError,
    coloniaError,
    addressError,
    contactError,
    emailError,
    driverPictureError,
    driverLicenseNumberError,
    dateLicenseError,
    stateLicenseError,
    typeLicenseError,
    frontLicensePictureError,
    backLicensePictureError,
    passwordError,
    repeatPasswordError,
    isActiveError,
    messageReasonInActiveError,
    servicesError,
  } = errorForm;

  if (
    !name &&
    !lastName &&
    !zipCode &&
    !state &&
    !city &&
    !colonia &&
    !address &&
    !contact &&
    !email &&
    !driverPicture &&
    !driverLicenseNumber &&
    !dateLicense &&
    !stateLicense &&
    !typeLicense &&
    !frontLicensePicture &&
    !backLicensePicture &&
    !password &&
    !repeatPassword &&
    !isActive &&
    !messageReasonInActive &&
    !services
  ) {
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${"Todos los campos son requeridos" || ""}</p>
      `,
    });
  } else if (
    nameError ||
    lastNameError ||
    zipCodeError ||
    stateError ||
    cityError ||
    coloniaError ||
    addressError ||
    contactError ||
    emailError ||
    driverPictureError ||
    driverLicenseNumberError ||
    dateLicenseError ||
    stateLicenseError ||
    typeLicenseError ||
    frontLicensePictureError ||
    backLicensePictureError ||
    passwordError ||
    repeatPasswordError ||
    isActiveError ||
    messageReasonInActiveError ||
    servicesError
  ) {
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${nameError || ""}</p>
        <p>${lastNameError || ""}</p>
        <p>${zipCodeError || ""}</p>
        <p>${stateError || ""}</p>
        <p>${cityError || ""}</p>
        <p>${coloniaError || ""}</p>
        <p>${addressError || ""}</p>
        <p>${contactError || ""}</p>
        <p>${emailError || ""}</p>
        <p>${driverPictureError || ""}</p>
        <p>${driverLicenseNumberError || ""}</p>
        <p>${dateLicenseError || ""}</p>
        <p>${stateLicenseError || ""}</p>
        <p>${typeLicenseError || ""}</p>
        <p>${frontLicensePictureError || ""}</p>
        <p>${backLicensePictureError || ""}</p>
        <p>${passwordError || ""}</p>
        <p>${repeatPasswordError || ""}</p>
        <p>${isActiveError || ""}</p>
        <p>${messageReasonInActiveError || ""}</p>
        <p>${servicesError || ""}</p>
      `,
    });
  }
}

export function successRegister(driver) {
  const {
    name,
    lastName,
    zipCode, // CODIGO POSTAL
    state, // ESTADO DE MEXICO
    city,
    colonia,
    address,
    contact, // NUMERO DE CONTACTO DEL CONDUCTOR
    email,
    driverPicture, //* FOTO DEL CONDUCTOR
    driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
    dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
    stateLicense, // ESTADO DE LA LICENCIA
    typeLicense, // TIPO LICENCIA
    frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
    password,
    repeatPassword,
    isActive,
    messageReasonInActive, // MENSAJE RASON INACTIVO
    services, // TODOS - LGBQT+ - MUJERES
  } = driver;

  if (
    name &&
    lastName &&
    zipCode &&
    state &&
    city &&
    colonia &&
    address &&
    contact &&
    email &&
    driverPicture &&
    driverLicenseNumber &&
    dateLicense &&
    stateLicense &&
    typeLicense &&
    frontLicensePicture &&
    backLicensePicture &&
    password &&
    repeatPassword &&
    isActive &&
    messageReasonInActive &&
    services
  ) {
    Swal.fire({
      icon: "success",
      title: "Conductor registrado con exito",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
