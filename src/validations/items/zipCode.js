import { regexZipCode } from "../../tools/regex";

export const validationZipCode = (zipCode) => {
  let error = '';
  
  if (!regexZipCode.test(zipCode)) {
    error = 'Código postal invalido';
  }

  return error;
}