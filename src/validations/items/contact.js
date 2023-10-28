import { regexPhone } from "../../tools/regex";

export const validationContact = (contact) => {
  let contactError = '';

  if (contact && !regexPhone.test(contact)) {
    contactError = 'Debes ingresar un número de 10 digitos';
  }

  return contactError;
}