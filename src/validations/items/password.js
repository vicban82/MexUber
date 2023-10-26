import { regexPassword } from "../../tools/regex";

export const validationPassword = (password) => {
  let passwordError = '';

  if (password && !regexPassword.test(password)) {
    passwordError = `La clave debe contener entre 8 - 16 caracteres, mayúsculas, números y caracteres especiales.`;
  }

  return passwordError;
}