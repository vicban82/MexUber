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
          <p>${"Si cambias de contraseña debes llenar el campo faltante" || ""}</p>
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
        title: "Modificar administrador",
        showConfirmButton: false,
        timer: 4000,
        html: `
          <p>${`Administrador <strong>${name} ${lastName}</strong> ha sido modificado con exito` || ""}</p>
        `,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Modificar administrador",
        showConfirmButton: false,
        timer: 4000,
        html: `
          <p>${`Administrador <strong>${name} ${lastName}</strong> ha sido modificado con exito` || ""}</p>
        `,
      });
    }
  }
}
