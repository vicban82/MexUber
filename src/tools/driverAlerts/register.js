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

  const {
    driverLicenseNumberError,
    stateLicenseError,
    typeLicenseError,
    dateLicenseError,
    frontLicensePictureError,
    backLicensePictureError,
    messageReasonInActiveError,
  } = errorForm;

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
    !password ||
    !repeatPassword ||
    !isActive === 1 ||
    !allServices === 1 ||
    !servicesLGBQT === 1 ||
    !onlyWomenServices === 1
  ) {
    Swal.fire({
      title: "Advertencia",
      icon: "warning",
      text: "Credenciales incorrectas.",
      html: `
        <p>${"Todos los campos son requeridos"}</p>
      `,
    });
  } else {
    if (stateLicenseError || typeLicenseError || dateLicenseError || frontLicensePictureError || backLicensePictureError) {
      Swal.fire({
        title: "Advertencia",
        icon: "warning",
        text: "Credenciales incorrectas.",
        html: `
          <p>${"Rectifica los campos de la licencia de conducción"}</p>
        `,
      });
    } else if (messageReasonInActiveError) {
      Swal.fire({
        title: "Advertencia",
        icon: "warning",
        text: "Credenciales incorrectas.",
        html: `
          <p>${"Te falto el motivo de la inactividad"}</p>
        `,
      });
    }
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
    allServices === 1 ||
    servicesLGBQT === 1 ||
    onlyWomenServices === 1 ||
    password &&
    repeatPassword
  ) {
    Swal.fire({
      icon: "success",
      title: `Nuevo conductor`,
      showConfirmButton: false,
      timer: 4000,
      html: `
        <p>${`Conductor <strong>${name} ${lastName}</strong> ha sido registrado con exito` || ""}</p>
      `,
    });
  } else {
    if (dateLicense && stateLicense && typeLicense && frontLicensePicture && backLicensePicture || messageReasonInActive) {
      Swal.fire({
        icon: "success",
        title: `Nuevo conductor`,
        showConfirmButton: false,
        timer: 4000,
        html: `
          <p>${`Conductor <strong>${name} ${lastName}</strong> ha sido registrado con exito` || ""}</p>
        `,
      });
    }
  }
}
