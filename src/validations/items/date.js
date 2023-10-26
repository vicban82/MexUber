export const validationDate = (dateLicense) => {
  let dateLicenseError = '';

  const fechaActual = new Date();
  const fechaIngresada = dateLicense;

  if (!fechaIngresada) {
    dateLicenseError = 'Te faltó ingresar una fecha';
  } else {
    const partesFecha = fechaIngresada.split('-');
    const dia = parseInt(partesFecha[2], 10);
    const mes = parseInt(partesFecha[1]) - 1;
    const anio = parseInt(partesFecha[0], 10);

    const fechaUsuario = new Date(anio, mes, dia);
    const treintaDiasEnMilisegundos = 30 * 24 * 60 * 60 * 1000; // 30 días en milisegundos
    const treintaDiasDespués = new Date(fechaActual.getTime() + treintaDiasEnMilisegundos);

    if (fechaUsuario <= fechaActual) {
      dateLicenseError = 'La fecha de vigencia debe ser mayor';
    } else if (fechaUsuario <= treintaDiasDespués) {
      dateLicenseError = 'La fecha de vigencia debe ser al menos 30 días posteriores a la fecha actual';
    }
  }

  return dateLicenseError;
}