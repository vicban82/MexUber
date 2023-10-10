import { regexPhone } from "../../tools/regex";

export const validationContact = (contact) => {
  let contactError = '';

  if (!contact) {
    // console.log("contact:", contact)
    contactError = 'Debes ingregar un número de contacto';
  } else if (!regexPhone.test(contact)) {
    // console.log("contact:", !regexPhone.test(contact))
    contactError = 'Tu número de contacto no es valido';
  }

  return contactError;
}