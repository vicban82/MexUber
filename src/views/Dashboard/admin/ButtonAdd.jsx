import React, { useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { errorRegister, successRegister } from "../../../tools/switAlertRegister";
import { axiosPostAdmin } from "../../../hooks/admin/crudAdmin";
import styled from 'styled-components';
Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

const AdminTitulo = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px 5px;
    padding: 15px 7% 1px 7%;
    justify-content: space-between;
    margin-top: -75px;
    height: 50px;
    align-items: center;
`;


const ButtonV1 = styled.button`
  color: #646cff;

  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
`;

export const ButtonAdd = ({ tBody, tHeader }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    isActive: false, // Cambié el valor por defecto a false para checkbox
  });

  const [error, setError] = useState({
    nameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
    isActiveError: "",
  });

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
    if (!name || !lastName || !email || !password || !repeatPassword || !isActive) {
      errorRegister(admin, error);
    } else if (nameError || lastNameError || emailError || passwordError || repeatPasswordError || isActiveError) {
      errorRegister(admin, error);
    } else {
      successRegister(admin);
      axiosPostAdmin(admin, setError);
  
      // Cierra el modal después de guardar
      setModalIsOpen(false);
    }
  }

  return (
  <>
    <AdminTitulo>
      <div><h2>Administradores<br /></h2></div>
      <ButtonV1 onClick={() => setModalIsOpen(true)}>Agregar</ButtonV1>
    </AdminTitulo>
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
                    value={admin[key] ? "1" : "0"} // 1 como true y 0 como false
                    // value={admin[key] ? 1 : 0} // 1 como true y 0 como false
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
</>  
  );
};
