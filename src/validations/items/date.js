export const validationDate = (dateLicense) => {
  let dateLicenseError = '';

  const fechaActual = new Date();
  const fechaIngresada = dateLicense; // Obtén la fecha ingresada por el usuario de alguna manera
  const partesFecha = fechaIngresada.split('-');
  const dia = parseInt(partesFecha[0], 10);
  const mes = parseInt(partesFecha[1] - 1, 10); // Los meses en JavaScript van de 0 a 11
  const anio = parseInt(partesFecha[2], 10);

  const fechaUsuario = new Date(anio, mes, dia);
  const treintaDiasEnMilisegundos = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
  const treintaDiasDespues = new Date(fechaActual.getTime() + treintaDiasEnMilisegundos);

  if (!fechaIngresada) {
    // console.log("dateLicense:", dateLicense)
    dateLicenseError = 'Te falto poner una fecha';
  } else if (fechaUsuario < treintaDiasDespues) {
    dateLicenseError = 'La fecha de vigencia debe ser mayor a la fecha actual mínimo por 30 días';
  }

  return dateLicenseError;
}