import Swal from "sweetalert2";

//* Esta funcion es para la conexion con el Back-End
export function errorRegister(admin, error) {
  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
    isActive,
  } = admin;
  const {
    nameError,
    lastNameError,
    emailError,
    passwordError,
    repeatPasswordError,
    isActiveError,
  } = error;

  if (!name && !lastName && !email && !password && !repeatPassword) {
    Swal.fire({
      title: "Error en el inicio de sesión",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${"Todos los campos son requeridos" || ""}</p>
      `,
    });
  } else if (nameError || lastNameError || emailError || passwordError || repeatPasswordError) {
    Swal.fire({
      title: "Error en el inicio de sesión",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${nameError || ""}</p>
        <p>${lastNameError || ""}</p>
        <p>${emailError || ""}</p>
        <p>${passwordError || ""}</p>
        <p>${repeatPasswordError || ""}</p>
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
      title: "Admin registrado con exito",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
