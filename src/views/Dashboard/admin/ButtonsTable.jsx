import { useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
Modal.setAppElement("#root");

export function ButtonsTable({ id, tBody, setTBody, setTError }) {

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    isActive: 0,
  });

  const [error, setError] = useState({
    nameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
    isActiveError: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async (id) => {
    1
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
  const newValue = type === "checkbox" ? (value === "1" ? true : false) : value;
    // const newValue = type === "checkbox" ? !admin[name] : value;

    // // Manejar cambios para checkbox
    // const newValue = type === "checkbox" ? checked : value;

    setAdmin({
      ...admin,
      [name]: newValue,
    });
    setError(
      validateAdmin({
        ...admin,
        [name]: newValue,
      })
    )
  }

  const editItem = (id) => {
    // Tu lógica para guardar los cambios aquí
    closeModal(); // Cierra el modal después de guardar
  };
  
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
        <form onSubmit={''}>
          <br />
          {Object.keys(admin).map((key) => {
            return (
              <div key={key}>
                <label htmlFor={`input-${key}`}>{key}: </label>
                {key !== "isActive" ? (
                  key === "password" || key === "repeatPassword" ? (
                    <input
                      id={`input-${key}`}
                      name={key}
                      value={admin[key] || ""}
                      onChange={handleChange}
                      type="password"
                    />
                  ) : (
                    <input
                      id={`input-${key}`}
                      name={key}
                      value={admin[key] || ""}
                      onChange={handleChange}
                      type="text"
                    />
                  )
                ) : (
                  <input
                    id={`input-${key}`}
                    name={key}
                    checked={admin[key]}
                    onChange={handleChange}
                    type="checkbox"
                    value={admin[key] ? "1" : "0"} // 1 como true y 0 como false
                    // value={admin[key] ? 1 : 0} // 1 como true y 0 como false
                  />
                )}
              </div>
            );
          })}
          <div>
            <button onClick={closeModal}>Cancelar</button>
            <button onClick={() => editItem(id)}>Guardar</button>
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
