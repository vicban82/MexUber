import { maxSize, regexExtension, regexMimeType } from "../../tools/regex";

export const validationDriverPicture = (selectImage, driverPicture) => {
  let imageError = '';

  if (!driverPicture) {
    imageError = 'Debes subir una foto tuya';
  } else if (!regexMimeType.test(selectImage.type)) {
    imageError = 'Sólo se admiten formato jpeg, jpg y png';
  } else if (!regexExtension.test(selectImage.path)) {
    imageError = 'Sólo se admiten formato png, jpg y jpeg';
  } else if (selectImage.size > maxSize) {
    imageError = 'La imagen no puede exceder de 5MB';
  }

  return imageError;
}

export const validationFrontPicture = (selectImage, frontLicensePicture) => {
  let imageError = '';
  
  if (!frontLicensePicture) {
    imageError = 'Debe de subir una foto frontal de tu licencia';
  } else if (!regexMimeType.test(selectImage.type)) {
    imageError = 'Solo se admiten formato jpeg, jpg y png';
  } else if (!regexExtension.test(selectImage.path)) {
    imageError = 'Sólo se admiten formato png, jpg y jpeg';
  } else if (selectImage.size > maxSize) {
    imageError = 'La imagen no puede exceder de 5MB';
  }

  return imageError;
}

export const validationBackPicture = (selectImage, backLicensePicture) => {
  let imageError = '';
  
  if (!backLicensePicture) {
    imageError = 'Debe de subir una foto del reverso de tu licencia';
  } else if (!regexMimeType.test(selectImage.type)) {
    imageError = 'Solo se admiten formato jpeg, jpg y png';
  } else if (!regexExtension.test(selectImage.path)) {
    imageError = 'Sólo se admiten formato png, jpg y jpeg';
  } else if (selectImage.size > maxSize) {
    imageError = 'La imagen no puede exceder de 5MB';
  }

  return imageError;
}