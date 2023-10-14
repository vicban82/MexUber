import React, { useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { errorRegister, successRegister } from "../../../tools/adminAlerts/register";
import { axiosPostAdmin } from "../../../hooks/admin/crudAdmin";
import { headers } from "../../../tools/accessToken";
import { props } from "./props";
import styled from 'styled-components';
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
  LabelCheck,
 } from "../../../components/reusable/FormularioModalAdmin";

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
          <InputContainer>
            <Input
              type="text"
              name={"name"}
              placeholder="a"
              value={name}
              onChange={handleChange}
            />
            <Label>Nombre: </Label>
            <br />
            {nameError && (
              <span>{nameError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              name={"lastName"}
              placeholder="a"
              value={lastName}
              onChange={handleChange}
            />
            <Label>Apellidos: </Label>
            <br />
            {lastNameError && (
              <span>{lastNameError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              name={"email"}
              placeholder="a"
              value={email}
              onChange={handleChange}
            />
            <Label>Correo electrónico: </Label>
            <br />
            {emailError && (
              <span>{emailError}</span>
            )}
          </InputContainer>
          <InputContainer>
            <Input
              type="password"
              name={"password"}
              placeholder="a"
              value={password}
              onChange={handleChange}
            />
            <Label>Contraseña: </Label>
            <br />
            {passwordError && (
              <span>{passwordError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="password"
              name={"repeatPassword"}
              placeholder="a"
              value={repeatPassword}
              onChange={handleChange}
            />
            <Label>Repetr contraseña: </Label>
            <br />
            {repeatPasswordError && (
              <span>{repeatPasswordError}</span>
            )}
          </InputContainer>

          <InputContainer>
            <InputCheck
              type="checkbox"
              name={"isActive"}
              checked={isActive === 1}
              onChange={handleCheckboxChange}
              />
            <LabelCheck>Activo </LabelCheck>
            <br />
          </InputContainer>

          <ButtonContainer>
            <SubmitBtn onClick={() => setModalIsOpen(false)}>Cancelar</SubmitBtn>
            <SubmitBtn type="submit">Guardar</SubmitBtn>
          </ButtonContainer>
        </FormEdit>
      </ContainerModal>
</>  
  );
};
