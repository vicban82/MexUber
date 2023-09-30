import Swal from "sweetalert2";
import { axiosDeleteAdmin } from "../../hooks/admin/crudAdmin";
import { headers } from "../accessToken";

//* Esta funcion es para la conexion con el Back-End
export async function deleteAlert(deleteAdmin, id, tBody, setTBody, setTError) {
  const {
    name,
    lastName,
  } = deleteAdmin

  const result = await Swal.fire({
    title: "Borrar",
    icon: "warning",
    html: `
      <p>${`¿Deseas borrar al administrador <strong>${name} ${lastName}</strong>?` || ""}</p>
      <p>${`Esta acción puede ser irreversible y el usuario no podrá ingresar al sistema` || ""}</p>
    `,
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    showConfirmButton: true,
  });

  if (result.isConfirmed) {
    await axiosDeleteAdmin(id, headers, setTError);
    const filterById = tBody.filter(el => el._id !== id)
    setTBody([...filterById]);
  } else if (result.isDismissed) {
    return;
  }
}