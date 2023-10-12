import { regexLastName, regexName } from "../../tools/regex";

export const validationName = (name) => {
  let nameError = '';
  
  if (!name) {
    nameError = 'Debes colocar tu nombre';
  } else if (!name.match(regexName)) {
    nameError = 'Debes colocar un nombre valido';
  }

  return nameError;
}

export const validationLastName = (lastName) => {
  let lastNameError = '';
  
  if (!lastName) {
    lastNameError = 'Debes colocar tu apellido';
  } else if (!lastName.match(regexLastName)) {
    lastNameError = 'Debes colocar un apellido valido';
  }

  return lastNameError;
}