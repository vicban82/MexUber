import { validationLastName, validationName } from "./items/name";
import { validationContact } from "./items/contact";
import { validationEmail } from "./items/email";
import { validationPassword } from "./items/password";
import { regexDate, regexLicenceNumber, regexPhone, regexZipCode } from "../tools/regex";
import { validationState } from "./items/state";
import { validationDate } from "./items/date";
import { validationBackPicture, validationDriverPicture, validationFrontPicture } from "./items/image";
import { validationIsActive } from "./items/isActive";
// import { regexPhone } from "../tools/regex";

export const validateDriver = (driver, codigoPostal, estado, formatImage, ciudad, colonias, licences) => {
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
  console.log("validateDriver:", driver)
  const error = {};

  // * VALIDANDO INFORMACION DEL CONDUCTOR
  
  error.nameError = validationName(name);
  
  error.lastNameError = validationLastName(lastName);
  
  if (!zipCode) {
    error.zipCodeError = 'Debe colocar un código postal';
  } else if (!regexZipCode.test(zipCode)) {
    error.zipCodeError = 'Código postal invalido';
  } else if (codigoPostal && codigoPostal !== zipCode) {
    error.zipCodeError = 'Código postal no compatible con la db';
  }
  
  error.stateError = validationState(estado, state);

  // console.log("ciudad:", ciudad)
  // console.log("city:", city)
  if (!city) {
    error.cityError = 'Debes seleccionar una Ciudad';
  }
  
  if (!colonia) {
    error.coloniaError = 'Debes seleccionar una colonia';
  }
  
  if (!address) {
    error.addressError = 'Debes ingregar tu domicilio o dirección';
  }
  
  error.contactError = validationContact(contact);
  
  error.emailError = validationEmail(email);
  
  error.driverPictureError = validationDriverPicture(formatImage, driverPicture);
  
  // * VALIDANDO LICENCIA DEL CONDUCTOR

  if (driverLicenseNumber) {
    if (!regexLicenceNumber.test(driverLicenseNumber)) {
      error.driverLicenseNumberError = 'Debes ingresar un número de licencia valido';
    }
    
    error.stateLicenseError = validationState(estado, stateLicense);
    
    if (!typeLicense) {
      error.typeLicenseError = 'Debes de elegir un tipo de licencia'
    }
    
    error.dateLicenseError = validationDate(dateLicense);
    
    error.frontLicensePictureError = validationFrontPicture(formatImage, frontLicensePicture);
    
    error.backLicensePictureError = validationBackPicture(formatImage, backLicensePicture);
  }
  
  
  // * VALIDANDO AJUSTES DE LA APLICACION
  
  // console.log("allServices:", allServices)
  if (allServices === 0 && servicesLGBQT === 0 && onlyWomenServices === 0) {
    error.servicesError = 'Debes de elegir al menos un servicio';
  }
  
  // * VALIDANDO ACCESO A LA APLICACION

  error.passwordError = validationPassword(password);
  
  if (password !== repeatPassword) {
    error.repeatPasswordError = 'El password no coincide';
  }

  error.messageReasonInActiveError = validationIsActive(isActive, messageReasonInActive);

  return error;
}