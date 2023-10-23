import { emailRegex } from "../../tools/regex";

export const validationEmail = (gmail) => {
  let emailError = '';

  if (gmail && !emailRegex.test(gmail)) {
    emailError = 'El correo electrónico no es válido';
  }

  return emailError;
}