import { regexLastName, regexName } from "../../tools/regex";

export const validationName = (name) => {
  let nameError = '';
  
  if (name && !name.match(regexName)) {
    nameError = 'Debes colocar un nombre valido';
  }

  return nameError;
}

export const validationLastName = (lastName) => {
  let lastNameError = '';
  
  if (lastName && !lastName.match(regexLastName)) {
    lastNameError = 'Debes colocar un apellido valido';
  }

  return lastNameError;
}