import { validationLastName, validationName } from "./items/name";
import { validationEmail } from "./items/email";
import { validationPassword } from "./items/password";
import { validationIsActive } from "./items/isActive";

export const validateAdmin = (admin) => {
  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
    isActive,
  } = admin;
  const error = {};
  console.log('password:', password);
  
  error.nameError = validationName(name);
  
  error.lastNameError = validationLastName(lastName);
  
  error.emailError = validationEmail(email);
  
  error.passwordError = validationPassword(password);
  console.log('passwordError:', error.passwordError);

  if (validationPassword(password) !== repeatPassword) {
    error.repeatPasswordError = 'El password no coincide';
  }

  error.isActiveError = validationIsActive(isActive);

  return error;
}