export const validationState = (estado, state) => {
  let stateLicenseError = '';

  if (!state) {
    // console.log("state:", state)
    stateLicenseError = 'Debes seleccionar un Estado';
  } else if (estado !== state) {
    stateLicenseError = 'Debes seleccionar un Estado';
  }

  return stateLicenseError;
}