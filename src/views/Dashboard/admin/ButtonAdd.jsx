import React, { useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { errorRegister, successRegister } from "../../../tools/adminAlerts/register";
import { axiosPostAdmin } from "../../../hooks/admin/crudAdmin";
import { headers } from "../../../tools/accessToken";
import { props } from "./props";
Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

export const ButtonAdd = ({ tBody, setTBody, errorForm, setErrorForm }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    // isActive: 0 || false ? 0 : 1, // Cambié el valor por defecto a false para checkbox
    isActive: 0 || 1, // Cambié el valor por defecto a false para checkbox
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
    const newValue = type === "checkbox" ? !admin[name] : value;

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
    // Aquí puedes realizar las acciones de guardar tus datos, por ejemplo, enviarlos a través de una API
    // console.log("Admin data:", admin);
    const {
      nameError,
      lastNameError,
      emailError,
      passwordError,
      repeatPasswordError,
    } = errorForm
    if (!name || !lastName || !email || !password || !repeatPassword) {
      errorRegister(admin, errorForm);
    } else if (nameError || lastNameError || emailError || passwordError || repeatPasswordError) {
      errorRegister(admin, errorForm);
    } else {
      try {
        successRegister(admin);
        const newAdmin = await axiosPostAdmin(admin, setErrorForm, headers);
        setTBody([...tBody, newAdmin]);
    
        // Cierra el modal después de guardar
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error al guardar el admin:", error);
      }
    }
  }

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Agregar</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <br />
          {Object.keys(admin).map((el, idx) => {
            for (const esp in props) {
              if (el === esp) {
                return (
                  <div key={idx}>
                    <label htmlFor={`input-${el}`}>{props[esp]}: </label>
                    {el !== "isActive" ? (
                      el === "password" || el === "repeatPassword" ? (
                        <input
                          id={`input-${el}`}
                          name={el}
                          value={admin[el] || ""}
                          onChange={handleChange}
                          type="password"
                        />
                      ) : (
                        <input
                          id={`input-${el}`}
                          name={el}
                          value={admin[el] || ""}
                          onChange={handleChange}
                          type="text"
                        />
                      )
                    ) : (
                      <input
                        id={`input-${el}`}
                        name={el}
                        checked={admin[el]}
                        onChange={handleChange}
                        type="checkbox"
                        value={admin[el] ? 1 : 0} // 1 como true y 0 como false
                      />
                    )}
                  </div>
                );

              }
            }
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
