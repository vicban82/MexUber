import { regexImages } from "../../tools/regex";

export const validationDriverPicture = (formatImage, driverPicture) => {
  let imageError = '';

  if (!driverPicture) {
    imageError = 'Debes subir una foto tuya';
  } else if (!regexImages.test(formatImage)) {
    imageError = 'Sólo se admiten formato jpg y png';
  }

  return imageError;
}

export const validationFrontPicture = (formatImage, frontLicensePicture) => {
  let imageError = '';
  
  if (!frontLicensePicture) {
    imageError = 'Debe de subir una foto frontal de tu licencia';
  } else if (!regexImages.test(formatImage)) {
    imageError = 'Solo se admiten formato jpg y png';
  }

  return imageError;
}

export const validationBackPicture = (formatImage, backLicensePicture) => {
  let imageError = '';
  
  if (!backLicensePicture) {
    imageError = 'Debe de subir una foto del reverso de tu licencia';
  } else if (!regexImages.test(formatImage)) {
    imageError = 'Solo se admiten formato jpg y png';
  }

  return imageError;
}