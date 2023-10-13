import React, { useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { errorRegister, successRegister } from "../../../tools/adminAlerts/register";
import { axiosPostAdmin } from "../../../hooks/admin/crudAdmin";
import { headers } from "../../../tools/accessToken";
import { props } from "./props";
import { 
  ContainerModal,
  FormHead,
  FormEdit,
  InputContainer,
  Label,
  Input,
  SubmitBtn,
  ButtonContainer,
  InputCheck,
 } from "../../../components/reusable/FormularioModal";
Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

import styled from 'styled-components';

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

/* ----------------------- Funcionalidad --------------------------------- */

export const ButtonAdd = ({ tBody, setTBody, errorForm, setErrorForm }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    isActive: 1,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setAdmin({
      ...admin,
      [name]: value,
    });
    setErrorForm(
      validateAdmin({
        ...admin,
        [name]: value,
      })
    )
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    let updatedAdmin = { ...admin };

    if (name === "isActive") {
      updatedAdmin.isActive = checked ? 1 : 0;
    }

    setAdmin(updatedAdmin);
  };

  const {
    name,
    lastName,
    email,
    password,
    repeatPassword,
    isActive,
  } = admin;

  const {
    nameError,
    lastNameError,
    emailError,
    passwordError,
    repeatPasswordError,
  } = errorForm;

  async function handleSubmit(e) {
    e.preventDefault();
    if (name && lastName && email && password && repeatPassword) {
      try {
        successRegister(admin);
        const newAdmin = await axiosPostAdmin(admin, setErrorForm, headers);
        setTBody([...tBody, newAdmin]);
    
        // Cierra el modal después de guardar
        setModalIsOpen(false);
        setAdmin({
          name: "",
          lastName: "",
          email: "",
          password: "",
          repeatPassword: "",
          isActive: 1,
        })
      } catch (error) {
        console.error("Error al guardar el admin:", error);
      }
    } else {
      errorRegister(admin);
    }
  }

  return (
  <>
    <AdminTitulo>
      <div><h2>Administradores<br /></h2></div>
      <ButtonV1 onClick={() => setModalIsOpen(true)}>Agregar</ButtonV1>
    </AdminTitulo>
      <ContainerModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <FormEdit onSubmit={handleSubmit}>
          <FormHead><h2>Nuevo Administrador</h2></FormHead>
          <br />
          <div>
            <label>Nombre: </label>
            <input
              type="text"
              name={"name"}
              value={name}
              onChange={handleChange}
            />
            <br />
            {nameError && (
              <span>{nameError}</span>
            )}
          </div>

          <div>
            <label>Apellidos: </label>
            <input
              type="text"
              name={"lastName"}
              value={lastName}
              onChange={handleChange}
            />
            <br />
            {lastNameError && (
              <span>{lastNameError}</span>
            )}
          </div>

          <div>
            <label>Correo electrónico: </label>
            <input
              type="text"
              name={"email"}
              value={email}
              onChange={handleChange}
            />
            <br />
            {emailError && (
              <span>{emailError}</span>
            )}
          </div>
          <div>
            <label>Contraseña: </label>
            <input
              type="password"
              name={"password"}
              value={password}
              onChange={handleChange}
            />
            <br />
            {passwordError && (
              <span>{passwordError}</span>
            )}
          </div>

          <div>
            <label>Repetr contraseña: </label>
            <input
              type="password"
              name={"repeatPassword"}
              value={repeatPassword}
              onChange={handleChange}
            />
            <br />
            {repeatPasswordError && (
              <span>{repeatPasswordError}</span>
            )}
          </div>

          <div>
            <label>Activo: </label>
            <input
              type="checkbox"
              name={"isActive"}
              checked={isActive === 1}
              onChange={handleCheckboxChange}
            />
            <br />
          </div>

          <div>
            <button onClick={() => setModalIsOpen(false)}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </Modal>
</>  
  );
};
