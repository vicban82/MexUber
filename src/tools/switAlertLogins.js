import Swal from "sweetalert2";

//* Esta funcion es para la conexion con el Back-End
export function errorLogins(login, error) {
  const {
    email,
    password,
  } = login;
  const {
    emailError,
    passwordError,
  } = error;
  
  if (!email && !password) {
    Swal.fire({
      title: "Error en el inicio de sesión",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${"Es necesario ingresar el usuario y/o contraseña para poder continuar." || ""}</p>
      `,
    });
  } else if (emailError || passwordError) {
    Swal.fire({
      title: "Error en el inicio de sesión",
      icon: "error",
      text: "Credenciales incorrectas.",
      html: `
        <p>${"El usuario y/o contraseña son incorrectos. <br/>Verifica e intenta de nuevo." || ""}</p>
      `,
    });
  }
}

export function successLogins(login) {
  const {
    email,
    password,
  } = login;
  
  if (email && password) {
    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

export function demoSwitAlertLogin(email, password) {
  // Comprobar si el correo y la contraseña son correctos
  if (email && password) {
    // Si son correctos, generar un token aleatorio
    // const token = uuidv4();

    // Crear el objeto emailLoginDrive con el token generado y otros datos
    const emailLoginDrive = {
      correo: email,
      contrasena: password,
      // token: token, // Agregar el token al objeto
    };      

    // Guardar el objeto emailLoginDrive en localStorage u otra lógica de autenticación necesaria
    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso",
      showConfirmButton: false, // Ocultar botón de confirmación
      timer: 2000, // Duración en milisegundos (en este caso, 2 segundos)
    });
    // navigate("/dashboard");
  } else {
    // Si son incorrectos, mostrar un mensaje de error o realizar alguna otra acción
    Swal.fire({
      icon: "error",
      title: "Error en el inicio de sesión",
      text: "Credenciales incorrectas.",
    });
  }

}