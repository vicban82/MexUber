import Swal from "sweetalert2";

export function errorUpDate(upDateForm, errorForm) {
  const copy = { ...upDateForm };
  const copyError = { ...errorForm };

  if (
    !copy.name ||
    !copy.lastName ||
    !copy.zipCode ||
    !copy.state ||
    !copy.city ||
    !copy.colonia ||
    !copy.address ||
    !copy.contact ||
    !copy.email ||
    !copy.driverPicture ||
    !copy.allServices === 1 ||
    !copy.servicesLGBQT === 1 ||
    !copy.onlyWomenServices === 1
  ) {
    Swal.fire({
      title: "Advertencia",
      icon: "warning",
      text: "Credenciales incorrectas.",
      html: `
        <p>${`Todos los campos con <strong>"*"</strong> son requeridos`}</p>
        <p>${"<strong>IMPORTANTE:</strong>"}</p>
        <li>${"Si ingresas un <strong>número de licencia</strong>, <br/>los demás campos también seran requeridos"}</li>
        <li>${`Si desactivas la casilla <strong>"Activo"</strong>, <br/>debes ingresar el movito`}</li>
      `,
    });
  } else {
    if (copyError.passwordError || copyError.repeatPasswordError) {
      Swal.fire({
        title: "Advertencia",
        icon: "warning",
        text: "Credenciales incorrectas.",
        html: `
          <p>${"Si cambias de contraseña la debes repetir para confirmarla"}</p>
        `,
      });
    } else if (
      copyError.driverPictureError ||
      (copyError.frontLicensePictureError && copyError.backLicensePictureError)
    ) {
      Swal.fire({
        title: "Advertencia",
        icon: "warning",
        text: "Credenciales incorrectas.",
        html: `
          <p>${"Si cambias una imagen debe reemplazarla"}</p>
        `,
      });
    } else if (
      copyError.stateLicenseError ||
      copyError.typeLicenseError ||
      copyError.dateLicenseError ||
      copyError.frontLicensePictureError ||
      copyError.backLicensePictureError
    ) {
      Swal.fire({
        title: "Advertencia",
        icon: "warning",
        text: "Credenciales incorrectas.",
        html: `
          <p>${"Rectifica los campos de la licencia de conducción"}</p>
        `,
      });
    } else if (copyError.messageReasonInActiveError) {
      Swal.fire({
        title: "Advertencia",
        icon: "warning",
        text: "Credenciales incorrectas.",
        html: `
          <p>${"Te falto el motivo de la inactividad"}</p>
        `,
      });
    }
  }
}

export function successUpDate(upDateForm) {
  const copy = { ...upDateForm };

  if (
    copy.name &&
    copy.lastName &&
    copy.zipCode &&
    copy.state &&
    copy.city &&
    copy.colonia &&
    copy.address &&
    copy.contact &&
    copy.email &&
    (copy.allServices === 1 ||
      copy.servicesLGBQT === 1 ||
      copy.onlyWomenServices === 1)
  ) {
    if (copy.password && copy.repeatPassword) {
      Swal.fire({
        icon: "success",
        title: `Actualización completa`,
        showConfirmButton: false,
        timer: 4000,
        html: `
          <p>${`Conductor <strong>${copy.name} ${copy.lastName}</strong> ha sido actualizado con exito`}</p>
        `,
      });
    } else if (
      copy.dateLicense &&
      copy.stateLicense &&
      copy.typeLicense &&
      copy.frontLicensePicture &&
      copy.backLicensePicture
    ) {
      Swal.fire({
        icon: "success",
        title: `Actualización completa`,
        showConfirmButton: false,
        timer: 4000,
        html: `
          <p>${`Conductor <strong>${copy.name} ${copy.lastName}</strong> ha sido actualizado con exito`}</p>
        `,
      });
    } else if (copy.messageReasonInActive) {
      Swal.fire({
        icon: "success",
        title: `Actualización completa`,
        showConfirmButton: false,
        timer: 4000,
        html: `
          <p>${`Conductor <strong>${copy.name} ${copy.lastName}</strong> ha sido actualizado con exito`}</p>
        `,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: `Actualización completa`,
        showConfirmButton: false,
        timer: 4000,
        html: `
          <p>${`Conductor <strong>${copy.name} ${copy.lastName}</strong> ha sido actualizado con exito`}</p>
        `,
      });
    }
  }
}
