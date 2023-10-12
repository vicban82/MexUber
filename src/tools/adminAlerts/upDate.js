import Swal from "sweetalert2";

export function errorUpDate(admin, errorForm) {
  const {
    name,
    lastName,
    email,
  } = admin;

  const {
    repeatPasswordError,
  } = errorForm;

  if (!name || !lastName || !email) {
    Swal.fire({
      title: "Advertencia",
      icon: "warning",
      text: "Credenciales incorrectas.",
      html: `
      <p>${"Todos los campos son requeridos" || ""}</p>
      `,
    });
  } else {
    if (repeatPasswordError) {
      Swal.fire({
        title: "Advertencia",
        icon: "warning",
        text: "Credenciales incorrectas.",
        html: `
          <p>${"Todos los campos son requeridos" || ""}</p>
        `,
      });
    }
  }
}

export function successUpDate(admin) {
  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
  } = admin;

  if (name && lastName && email) {
    if (password && repeatPassword) {
      Swal.fire({
        icon: "success",
        title: "Admin actualizado con exito",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Admin actualizado con exito",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}
