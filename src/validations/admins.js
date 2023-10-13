import { validationLastName, validationName } from "./items/name";
import { validationEmail } from "./items/email";
import { validationPassword } from "./items/password";

export const validateAdmin = (admin) => {
  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
  } = admin;

  const error = {};
  
  error.nameError = validationName(name);
  
  error.lastNameError = validationLastName(lastName);
  
  error.emailError = validationEmail(email);
  
  error.passwordError = validationPassword(password);

  if (password !== repeatPassword) {
    error.repeatPasswordError = 'El password no coincide';
  }

  return error;
}

export const validateUpDateAdmin = (admin) => {
  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
  } = admin;

  const error = {};
  
  error.nameError = validationName(name);
  
  error.lastNameError = validationLastName(lastName);
  
  error.emailError = validationEmail(email);

  if (password) {
    error.passwordError = validationPassword(password);
  
    if (password !== repeatPassword) {
      error.repeatPasswordError = 'El password no coincide';
    }
  }
  
  if (repeatPassword && !password) {
    error.repeatPasswordError = 'Debes ingresar un password para comparar';
  }

  return error;
}