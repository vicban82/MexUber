import { regexZipCode } from "../../tools/regex";

export const validationZipCode = (zipCode, codigoPostal) => {
  let error = '';
  
  if (!zipCode) {
    error = 'Debe colocar un código postal';
  } else if (!regexZipCode.test(zipCode)) {
    error = 'Código postal invalido';
  } else if (codigoPostal && codigoPostal !== zipCode) {
    error = 'Código postal no compatible con la db';
  }

  return error;
}