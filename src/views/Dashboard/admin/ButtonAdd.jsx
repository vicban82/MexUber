import React, { useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { errorRegister, successRegister } from "../../../tools/adminAlerts/register";
import { axiosGetAdmins, axiosPostAdmin } from "../../../hooks/admin/crudAdmin";
import { headers } from "../../../tools/accessToken";
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
  Titulo
 } from "../../../components/reusable/FormularioModalAdmin";

Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación


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

export const ButtonAdd = ({ tBody, setTBody, errorForm, setErrorForm, setPage, limit, setTotalPages }) => {
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
        const newAdmin = await axiosPostAdmin(admin, headers);
        // !NOTA: Desde el Back-End se revierte el arreglo
        setTBody([...tBody, newAdmin]);

        // Obtiene nuevamente los datos para actualizar la tabla
        await axiosGetAdmins(setTBody, setTotalPages, 1, limit);
    
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

        // Establece la página en 1 después de agregar un elemento
        setPage(1);
      } catch (error) {
        console.error("Error al guardar el admin:", error);
      }
    } else {
      errorRegister(admin);
    }
  }

  return (
  <>
    <Titulo>
      <div><h2>Administradores<br /></h2></div>
      <ButtonV1 onClick={() => setModalIsOpen(true)}>Agregar</ButtonV1>
    </Titulo>
      <ContainerModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <FormEdit onSubmit={handleSubmit}>
          <FormHead><h2>Nuevo Administrador</h2></FormHead>
          <br />
          <InputContainer>
            <Input
              type="text"
              name={"name"}
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
            <SubmitBtn type="submit">Guardar</SubmitBtn>
            <SubmitBtn onClick={() => {
              setModalIsOpen(false);
              setAdmin({
                name: "",
                lastName: "",
                email: "",
                password: "",
                repeatPassword: "",
                isActive: 1,
              });
              setErrorForm({
                nameError: "",
                lastNameError: "",
                emailError: "",
                passwordError: "",
                repeatPasswordError: "",
                isActiveError: "",
              });
            }}>Cancelar</SubmitBtn>
          </ButtonContainer>
        </FormEdit>
      </ContainerModal>
</>  
  );
};
