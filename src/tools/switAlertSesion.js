import Swal from "sweetalert2";

export async function cerrarSesion() {
  const result = await Swal.fire({
    title: "Cerrar sesión",
    text: "¿Deseas cerrar tu sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    showConfirmButton: true, // Mostrar el botón de confirmación
  });

  if (result.isConfirmed) {
    window.location.href = '/';
  } else if (result.isDismissed) {
    return;
  }
}