import { regexImages } from "../../tools/regex";

export const validationPicture = (driverPicture, frontLicensePicture, backLicensePicture) => {
  let imageError = '';

  if (!driverPicture) {
    // console.log("state:", state)
    imageError = 'Debes subir una foto tuya';
  } else if (!regexImages.test(driverPicture)) {
    imageError = 'Solo se admiten formato jpg y png';
  } else if (!frontLicensePicture) {
    imageError = 'Debe de subir una foto frontal de tu licencia';
  } else if (!regexImages.test(frontLicensePicture)) {
    imageError = 'Solo se admiten formato jpg y png';
  } else if (!backLicensePicture) {
    imageError = 'Debe de subir una foto del reverso de tu licencia';
  } else if (!regexImages.test(backLicensePicture)) {
    imageError = 'Solo se admiten formato jpg y png';
  }

  return imageError;
}