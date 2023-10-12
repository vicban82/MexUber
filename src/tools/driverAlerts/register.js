import Swal from "sweetalert2";

//* Esta funcion es para la conexion con el Back-End
export function errorRegister(driver) {
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
    //! DATOS DE LA LICENCIA DE CONDUCCION
    driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
    stateLicense, // ESTADO DE LA LICENCIA
    typeLicense, // TIPO LICENCIA
    dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
    frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
    //! DATOS DE LA LICENCIA DE CONDUCCION
    //! AJUSTES DE LA APLICACION
    allServices, // TODOS
    servicesLGBQT, // LGBQT+
    onlyWomenServices, // MUJERES
    //! AJUSTES DE LA APLICACION
    //! ACCESO A LA APLICACION
    password,
    repeatPassword,
    isActive,
    messageReasonInActive, // MENSAJE RASON INACTIVO
    //! ACCESO A LA APLICACION
    car,
  } = driver;

  if (
    !name ||
    !lastName ||
    !zipCode ||
    !state ||
    !city ||
    !colonia ||
    !address ||
    !contact ||
    !email ||
    !driverPicture ||
    !driverLicenseNumber ||
    !dateLicense ||
    !stateLicense ||
    !typeLicense ||
    !frontLicensePicture ||
    !backLicensePicture ||
    !password ||
    !repeatPassword ||
    !isActive ||
    !messageReasonInActive ||
    !allServices ||
    !servicesLGBQT ||
    !onlyWomenServices
  ) {
    Swal.fire({
      title: "Rectifica los capos",
      icon: "warning",
      text: "Credenciales incorrectas.",
      html: `
        <p>${"Todos los campos son requeridos" || ""}</p>
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
    //! DATOS DE LA LICENCIA DE CONDUCCION
    driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
    stateLicense, // ESTADO DE LA LICENCIA
    typeLicense, // TIPO LICENCIA
    dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
    frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
    //! DATOS DE LA LICENCIA DE CONDUCCION
    //! AJUSTES DE LA APLICACION
    allServices, // TODOS
    servicesLGBQT, // LGBQT+
    onlyWomenServices, // MUJERES
    //! AJUSTES DE LA APLICACION
    //! ACCESO A LA APLICACION
    password,
    repeatPassword,
    isActive,
    messageReasonInActive, // MENSAJE RASON INACTIVO
    //! ACCESO A LA APLICACION
    car,
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
    allServices &&
    servicesLGBQT &&
    onlyWomenServices
  ) {
    Swal.fire({
      icon: "success",
      title: "Conductor registrado con exito",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
