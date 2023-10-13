export const props = {
  name: "Nombre(s)",
  lastName: "Apellidos",
  zipCode: "Código Postal", // CODIGO POSTAL
  state: "Estado", // ESTADO DE MEXICO
  city: "Ciudad",
  colonia: "Colonia - Barrio",
  address: "Dirección / Domicilio",
  contact: "Teléfono (Móvil)", // NUMERO DE CONTACTO DEL CONDUCTOR
  email: "Correo electrónico",
  driverPicture: "Foto del conductor", //* FOTO DEL CONDUCTOR
  //! DATOS DE LA LICENCIA DE CONDUCCION
  driverLicenseNumber: "Número de licencia", //* NUMERO LICENCIA DEL CONDUCTOR
  stateLicense: "Estado licencia", // ESTADO DE LA LICENCIA
  typeLicense: "Tipo licencia", // TIPO LICENCIA
  dateLicense: "Vigencia de licencia", // FECHA - VIGENCIA DE LA LICENCIA
  frontLicensePicture: "Foto frontal de la licencia", //* FOTO FRONTAL DE LA LICENCIA
  backLicensePicture: "Foto reverso de la licencia", //* FOTO REVERSO DE LA LICENCIA
  //! DATOS DE LA LICENCIA DE CONDUCCION
  //! AJUSTES DE LA APLICACION
  services: "Servicio para", // TODOS - LGBQT+ - MUJERES
  //! AJUSTES DE LA APLICACION
  //! ACCESO A LA APLICACION
  password: "Contraseña",
  repeatPassword: "Repetir contraseña",
  isActive: "Activo",
  messageReasonInActive: "Motivo de bloqueo", // MENSAJE RASON INACTIVO
  //! ACCESO A LA APLICACION
  // car: "" || null,
}


// <div {...getFrontLicenseRootProps()} style={dropzoneContainerStyles} >
// <input {...getFrontLicenseInputProps()} disabled={driverLicenseNumber.length >= 1 ? false : true} />
// {frontLicensePicture && <img
//   src={`data:image/png;base64,${frontLicensePicture}`}
//   alt="Foto conductor" 
//   style={{ maxWidth: '100px' }} 
// />}
// <p>Frente</p>
// </div>
// <div {...getBackLicenseRootProps()} style={dropzoneContainerStyles} >
// <input {...getBackLicenseInputProps()} disabled={driverLicenseNumber ? false : true} />
// {backLicensePicture && <img
//   src={`data:image/png;base64,${backLicensePicture}`}
//   alt="Foto conductor" 
//   style={{ maxWidth: '100px' }} 
// />}
// <p>Atrás</p>
// </div>