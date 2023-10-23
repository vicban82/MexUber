import { regexPhone } from "../../tools/regex";

export const validationContact = (contact) => {
  let contactError = '';

  if (contact && !regexPhone.test(contact)) {
    contactError = 'Tu número de contacto no es valido';
  }

  return contactError;
}