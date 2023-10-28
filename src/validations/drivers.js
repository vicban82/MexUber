import { validationLastName, validationName } from "./items/name";
import { validationContact } from "./items/contact";
import { validationEmail } from "./items/email";
import { validationPassword } from "./items/password";
import { regexLicenceNumber } from "../tools/regex";
import { validationDate } from "./items/date";
import { validationBackPicture, validationDriverPicture, validationFrontPicture } from "./items/image";
import { validationIsActive } from "./items/isActive";
import { validationZipCode } from "./items/zipCode";

export const validateDriver = (driver, selectImage) => {
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
  // console.log("validateDriver:", driver)
  const error = {};

  // * VALIDANDO INFORMACION DEL CONDUCTOR
  
  error.nameError = validationName(name);
  error.lastNameError = validationLastName(lastName);
  error.zipCodeError = validationZipCode(zipCode);

  error.contactError = validationContact(contact);
  error.emailError = validationEmail(email);
  if (selectImage.path !== undefined && selectImage.type !== undefined) {
    error.driverPictureError = validationDriverPicture(selectImage, driverPicture);
  }
  
  // * VALIDANDO LICENCIA DEL CONDUCTOR

  if (driverLicenseNumber) {
    if (!regexLicenceNumber.test(driverLicenseNumber)) {
      error.driverLicenseNumberError = 'Debes ingresar un número de licencia entre 5 y 10 caracteres';
    }
    error.dateLicenseError = validationDate(dateLicense);
    error.frontLicensePictureError = validationFrontPicture(selectImage, frontLicensePicture);
    error.backLicensePictureError = validationBackPicture(selectImage, backLicensePicture);
  }
  
  // * VALIDANDO AJUSTES DE LA APLICACION
  
  if (allServices === 0 && servicesLGBQT === 0 && onlyWomenServices === 0) {
    error.servicesError = 'Debes de elegir al menos un servicio';
  }
  
  // * VALIDANDO ACCESO A LA APLICACION

  error.passwordError = validationPassword(password);
  if (password && !repeatPassword) {
    error.repeatPasswordError = 'Debes confirmar el password';
  } else if (password !== repeatPassword) {
    error.repeatPasswordError = 'El password no coincide';
  }

  error.messageReasonInActiveError = validationIsActive(isActive, messageReasonInActive);

  return error;
}