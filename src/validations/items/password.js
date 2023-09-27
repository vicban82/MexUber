import { regexPassword } from "../../tools/regex";

export const validationPassword = (password) => {
  let passwordError = '';

  if (!regexPassword.test(password)) {
    passwordError = `La contraseña debe contener entre 8 - 16 caracteres incluyendo: Mayúsculas, números y caracteres especiales (@, $, !, %, *, ?, _ , -, &)`;
  }

  return passwordError;
}