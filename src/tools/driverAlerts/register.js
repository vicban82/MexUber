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
    car,
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
    name ||
    lastName ||
    zipCode ||
    state ||
    city ||
    colonia ||
    address ||
    contact ||
    email ||
    driverPicture ||
    driverLicenseNumber ||
    dateLicense ||
    stateLicense ||
    typeLicense ||
    frontLicensePicture ||
    backLicensePicture ||
    password ||
    repeatPassword ||
    isActive ||
    messageReasonInActive ||
    services ||
    car
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
    emailError ||
    passwordError ||
    repeatPasswordError
  ) {
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${nameError || ""}</p>
        <p>${lastNameError || ""}</p>
        <p>${emailError || ""}</p>
        <p>${passwordError || ""}</p>
        <p>${repeatPasswordError || ""}</p>
      `,
    });
  }
}

export function successRegister(admin) {
  const { name, lastName, email, password, repeatPassword, isActive } = admin;

  if (name && lastName && email && password && repeatPassword && isActive) {
    Swal.fire({
      icon: "success",
      title: "Admin registrado con exito",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
