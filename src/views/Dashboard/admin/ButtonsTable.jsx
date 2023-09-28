import { useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { headers } from "../../../tools/accessToken";
import { axiosDeleteAdmin, axiosPutAdmin } from "../../../hooks/admin/crudAdmin";
import { errorRegister, successRegister } from "../../../tools/switAlertRegister";
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

  // const [error, setError] = useState({
  //   nameError: "",
  //   lastNameError: "",
  //   emailError: "",
  //   passwordError: "",
  //   repeatPasswordError: "",
  //   isActiveError: "",
  // });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // console.log("tBody:", tBody)
  // console.log("ID:", id)
  const findAdmin = tBody.find(el => el.id === id)
  // console.log("findAdmin:", findAdmin)

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    await axiosDeleteAdmin(id, headers);
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
  
  function handleSubmit(e) {
    e.preventDefault();
    const {
      nameError,
      lastNameError,
      emailError,
      passwordError,
      repeatPasswordError,
      isActiveError,
    } = errorForm;
    if (!name || !lastName || !email || !password || !repeatPassword) {
      errorRegister(admin, errorForm);
    } else if (nameError || lastNameError || emailError || passwordError || repeatPasswordError) {
      errorRegister(admin, errorForm);
    } else {
      successRegister(admin);
      axiosPutAdmin(id, admin, headers, setErrorForm);
  
      // Cierra el modal después de guardar
      setModalIsOpen(false);
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
              // console.log("findAdmin:", findAdmin)
              return (
                <div key={subI}>
                  <label htmlFor={`input-${item}`}>{item}: </label>
                  {item !== "isActive" ? (
                    item === "password" || item === "repeatPassword" ? (
                        <input
                          id={`input-${item}`}
                          name={item}
                          value={admin[item] || ""}
                          // placeholder={findAdmin[item]}
                          onChange={handleChange}
                          type="password"
                        />
                    ) : (
                      <input
                        id={`input-${item}`}
                        name={item}
                        value={admin[item] || ""}
                        // placeholder={findAdmin[item]}
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
                      // value={admin[item] ? "1" : "0"} // 1 como true y 0 como false
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
