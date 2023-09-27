import { fullName } from "../../tools/regex";

export const validationName = (name) => {
  let nameError = '';
  
  if (!name.match(fullName)) {
    nameError = 'Debes colocar un nombre valido';
  }

  return nameError;
}

export const validationLastName = (lastName) => {
  let lastNameError = '';
  
  if (!lastName.match(fullName)) {
    lastNameError = 'Debes colocar un apellido valido';
  }

  return lastNameError;
}