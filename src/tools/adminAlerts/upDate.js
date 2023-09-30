import Swal from "sweetalert2";

//* Esta funcion es para la conexion con el Back-End
export function errorUpDate(admin, errorForm) {
  const {
    name,
    lastName,
    email,
  } = admin;
  const {
    nameError,
    lastNameError,
    emailError,
  } = errorForm;

  if (!name && !lastName && !email) {
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${"Todos los campos son requeridos" || ""}</p>
      `,
    });
  } else if (nameError || lastNameError || emailError) {
    Swal.fire({
      title: "Error en la actualización",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${nameError || ""}</p>
        <p>${lastNameError || ""}</p>
        <p>${emailError || ""}</p>
      `,
    });
  }
}

export function successUpDate(admin) {
  const {
    name,
    lastName,
    email,
  } = admin;

  if (name && lastName && email) {
    Swal.fire({
      icon: "success",
      title: "Admin actualizado con exito",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
