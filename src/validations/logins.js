import { validationEmail } from "./items/email";
import { validationPassword } from "./items/password";

export const validateLogin = (login) => {
  const {
    email,
    password,
  } = login;
  const error = {};

  error.emailError = validationEmail(email);
  error.passwordError = validationPassword(password);

  return error;
}