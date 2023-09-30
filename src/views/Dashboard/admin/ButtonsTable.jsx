import { useEffect, useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { headers } from "../../../tools/accessToken";
import { axiosPutAdmin } from "../../../hooks/admin/crudAdmin";
import { errorRegister, successRegister } from "../../../tools/adminAlerts/register";
import { deleteAlert } from "../../../tools/adminAlerts/delete";
Modal.setAppElement("#root");

export function ButtonsTable({ id, tBody, setTBody, setTError, errorForm, setErrorForm }) {

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    isActive: 0 || 1,
  });

  useEffect(() => {
    // Actualiza el estado del admin cuando se cambia el ID para que coincida con el objeto correspondiente en tBody
    const currentAdmin = tBody.find(item => item._id === id);
    const update = {
      name: currentAdmin.name,
      lastName: currentAdmin.lastName,
      email: currentAdmin.email,
      // password: currentAdmin.password,
      password: "",
      // repeatPassword: currentAdmin.password,
      repeatPassword: "",
      isActive: 0 || 1,
    }
    if (update) {
      setAdmin(update);
    }
  }, [id, tBody]);

  // const [error, setError] = useState({
  //   nameError: "",
  //   lastNameError: "",
  //   emailError: "",
  //   passwordError: "",
  //   repeatPasswordError: "",
  //   isActiveError: "",
  // });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async (id) => {
    const deleteAdmin = tBody.find(el => el._id === id)
    deleteAlert(deleteAdmin, id, tBody, setTBody, setTError)
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
  // const newValue = type === "checkbox" ? (value === "1" ? true : false) : value;
    const newValue = type === "checkbox" ? !admin[name] : value;

    // // Manejar cambios para checkbox
    // const newValue = type === "checkbox" ? checked : value;

    setAdmin({
      ...admin,
      [name]: newValue,
    });
    setErrorForm(
      validateAdmin({
        ...admin,
        [name]: newValue,
      })
    )
  }

  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
    isActive,
  } = admin;
  
  async function handleSubmit(e) {
    e.preventDefault();
    const {
      nameError,
      lastNameError,
      emailError,
      passwordError,
      repeatPasswordError,
      isActiveError,
    } = errorForm;
    if (!name || !lastName || !email) {
      errorRegister(admin, errorForm);
    } else if (nameError || lastNameError || emailError) {
      errorRegister(admin, errorForm);
    } else {
      try {
        successRegister(admin);
        // Envia la solicitud de actualización al backend
        const currentAdmin = await axiosPutAdmin(id, admin, headers, setErrorForm);
        
        // Actualiza la lista en el frontend
        setTBody(prev => {
          // Reemplaza el admin editado en la lista por el nuevo admin devuelto por el backend
          const updatedTBody = prev.map(item => (item._id === id ? currentAdmin : item));
          return updatedTBody;
        });
  
        // Cierra el modal después de guardar
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error al guardar el admin:", error);
      }
    }
  }
  
  return (
    <td>
      {/* The button to open modal */}
      <button onClick={openModal}>
        <img src={editIcon} alt="Edición" />
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar elemento"
      >
        <form onSubmit={handleSubmit}>
          <br />
          {
            Object.keys(admin).map((item, subI) => {
              return (
                <div key={subI}>
                  <label htmlFor={`input-${item}`}>{item}: </label>
                  {item !== "isActive" ? (
                    item === "password" || item === "repeatPassword" ? (
                        <input
                          id={`input-${item}`}
                          name={item}
                          value={admin[item] || ""}
                          onChange={handleChange}
                          type="password"
                        />
                    ) : (
                      <input
                        id={`input-${item}`}
                        name={item}
                        value={admin[item] || ""}
                        onChange={handleChange}
                        type="text"
                      />
                    )
                  ) : (
                    <input
                      id={`input-${item}`}
                      name={item}
                      checked={admin[item]}
                      onChange={handleChange}
                      type="checkbox"
                      value={admin[item] ? 1 : 0} // 1 como true y 0 como false
                    />
                  )}
                </div>
              );
            })
          }
          <div>
            <button onClick={closeModal}>Cancelar</button>
            <button>Guardar</button>
          </div>
        </form>
      </Modal>

      <button onClick={() => handleDelete(id)}>
        <img
          src={deleteIcon}
          alt="Delete"
        />
      </button>
    </td>
  );
}
