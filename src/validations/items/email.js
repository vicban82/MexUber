import { dominiosPermitidosRegex, emailRegex } from "../../tools/regex";

export const validationEmail = (gmail) => {
  let emailError = '';

  if (!gmail) {
    emailError = 'Debe ingresar un correo';
  }

  if (!emailRegex.test(gmail) || !dominiosPermitidosRegex.test(gmail)) {
    emailError = 'El correo electrónico no es válido';
  }

  return emailError;
}