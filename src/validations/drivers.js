import { validationLastName, validationName } from "./items/name";
import { validationContact } from "./items/contact";
import { validationEmail } from "./items/email";
import { validationPassword } from "./items/password";
import { regexZipCode } from "../tools/regex";
// import { regexPhone } from "../tools/regex";

export const validateDriver = (driver, codigoPostal, colonias) => {
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
  const error = {};
  
  error.nameError = validationName(name);
  
  error.lastNameError = validationLastName(lastName);

  if (!regexZipCode.test(zipCode) || codigoPostal === zipCode) {
    error.zipCodeError = 'Código postal invalido';
  }
  
  if (!colonia || !colonias.includes(colonia)) {
    error.coloniaError = 'Debes seleccionar una colonia';
  }
  
  if (!address) {
    error.addressError = 'Debes ingregar tu domicilio o dirección';
  }
  
  error.contactError = validationContact(contact);
  
  error.emailError = validationEmail(email);
  
  error.passwordError = validationPassword(password);
  
  if (password !== repeatPassword) {
    error.repeatPasswordError = 'El password no coincide';
  }

  if (!driverPicture) {
    error.driverPictureError = 'Debes subir una foto tuya';
  }

  // error.isActiveError = validationIsActive(isActive);

  return error;
}