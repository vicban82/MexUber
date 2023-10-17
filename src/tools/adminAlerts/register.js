import Swal from "sweetalert2";

export function errorRegister(admin) {
  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
  } = admin;

  if (!name || !lastName || !email || !password || !repeatPassword) {
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

export function successRegister(admin) {
  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
    isActive,
  } = admin;

  if (name && lastName && email && password && repeatPassword && isActive) {
    Swal.fire({
      icon: "success",
      title: `Nuevo administrador`,
      showConfirmButton: false,
      timer: 4000,
      html: `
        <p>${`Administrador <strong>${name} ${lastName}</strong> ha sido registrado con exito` || ""}</p>
      `,
    });
  }
}
