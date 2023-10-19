export const validationState = (estado, state) => {
  let stateLicenseError = '';

  // console.log("estado:", estado)
  // console.log("state:", state)
  if (!state) {
    // console.log("state:", state)
    stateLicenseError = 'Debes seleccionar un Estado';
  } 
  // else if (estado !== state || !estado.includes(state)) {
  //   stateLicenseError = 'Debes seleccionar un Estado';
  // }

  return stateLicenseError;
}