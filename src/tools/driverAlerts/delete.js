import Swal from "sweetalert2";
import { axiosDeleteDriver } from "../../hooks/drivers/crudDrivers";
import { headers } from "../accessToken";

//* Esta funcion es para la conexion con el Back-End
export async function deleteAlert(deleteDriver, id, tDriver, setTDriver) {
  const {
    name,
    lastName,
  } = deleteDriver

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
    await axiosDeleteDriver(id, headers);
    const filterById = tDriver.filter(el => el._id !== id)
    setTDriver([...filterById]);
  } else if (result.isDismissed) {
    return;
  }
}