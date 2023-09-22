import React, { useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { switAlertRegister } from "../../../tools/switAlertRegister";
import { axiosPostAdmin } from "../../../hooks/admin/crudAdmin";
Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

export const ButtonAdd = ({ tBody, tHeader }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    // isActive: false ? 0 : 1, // Cambié el valor por defecto a false para checkbox
    // isActive: 0 ? false : 1, // Cambié el valor por defecto a false para checkbox
    isActive: !0 && !false ? (1 && true) : false, // Cambié el valor por defecto a false para checkbox
  });

  const [error, setError] = useState({
    nameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
    // isActiveError: false ? 0 : 1, // Cambié el valor por defecto a false para checkbox
    isActiveError: 0 ? false : 1, // Cambié el valor por defecto a false para checkbox
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
    const newValue = type === "checkbox" ? !admin[name] : value;

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

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí puedes realizar las acciones de guardar tus datos, por ejemplo, enviarlos a través de una API
    console.log("Admin data:", admin);
    const {
      nameError,
      lastNameError,
      emailError,
      passwordError,
      repeatPasswordError,
      isActiveError,
    } = error
    if (nameError || lastNameError || emailError || passwordError || repeatPasswordError || isActiveError) {
      switAlertRegister(admin, error);
    }
    switAlertRegister(admin, error);
    axiosPostAdmin(admin, setError);

    // Cierra el modal después de guardar
    setModalIsOpen(false);
  }

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
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
                    // value={admin[key] ? "1" : "0"} // 1 como true y 0 como false
                    value={admin[key] ? 1 : 0} // 1 como true y 0 como false
                  />
                )}
              </div>
            );
          })}
          <div>
            <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
