import styled from 'styled-components';
import { useEffect, useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { validateUpDateAdmin } from "../../../validations/admins";
import { headers } from "../../../tools/accessToken";
import { axiosPutAdmin } from "../../../hooks/admin/crudAdmin";
import { deleteAlert } from "../../../tools/adminAlerts/delete";
import { errorUpDate, successUpDate } from "../../../tools/adminAlerts/upDate";
import { props } from "./props";
import { 
  ContainerModal,
  ContainerScroll,
  FormHead,
  FormEdit,
  InputContainer,
  Label,
  Input,
  SubmitBtn,
  ButtonContainer,
  InputCheck,
  LabelCheck,
  Titulo,
  Span,
  GrupoInput,
  GrupoCheck,
  CheckContainer,
  InputContainerPass,
  GrupoInputPass,
  SelectContainer,
  Select,
  GrupoSelect,
  GrupoImg,
  SubeImgContainer,
  TituloSeccion,
  SpanData,
  ImgSube,
  SubeContainerImg,
  Textarea,
  TextareaContainer,
 } from "../../../components/reusable/FormularioModal";

/* --------------------------------------Estilos--------------------------------- */

const Img = styled.img`
  height: 32px;
`;

/* -------------------------------- Funcionalidad ----------------------------- */

Modal.setAppElement("#root");


export function ButtonsTable({ id, tBody, setTBody, setTError, errorForm, setErrorForm }) {

  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    isActive: 1,
  });

  useEffect(() => {
    // Actualiza el estado del admin cuando se cambia el ID para que coincida con el objeto correspondiente en tBody
    const currentAdmin = tBody.find(item => item._id === id);
    const update = {
      name: currentAdmin.name,
      lastName: currentAdmin.lastName,
      email: currentAdmin.email,
      password: "",
      repeatPassword: "",
      isActive: currentAdmin.isActive,
    }
    if (update) {
      setAdmin(update);
    }
  }, [id, tBody]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDelete = async (id) => {
    const deleteAdmin = tBody.find(el => el._id === id)
    deleteAlert(deleteAdmin, id, tBody, setTBody, setTError)
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setAdmin({
      ...admin,
      [name]: value,
    });
    setErrorForm(
      validateUpDateAdmin({
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
    if (name || lastName || email) {
      if (!passwordError && !repeatPasswordError) {
        try {
          successUpDate(admin);
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
      } else {
        errorUpDate(admin, errorForm);
      }
    } else {
      errorUpDate(admin, errorForm);
    }
  }
  
  return (
    <>
      {/* -------------------Boton Editar-------------------------------- */}
      <td>
        {/* The button to open modal */}
        <button onClick={() => setModalIsOpen(true)}>
          <Img src={editIcon} alt="Edición" />
        </button>

        {/* Modal */}
        <ContainerModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Editar elemento"
        >
          <FormEdit onSubmit={handleSubmit}>
          <FormHead><h2>Modificar Administrador</h2></FormHead>
            <br />
            <ContainerScroll>
              <GrupoInput>
                <InputContainer>
                  <Input
                    type="text"
                    name={"name"}
                    placeholder='a'
                    value={name}
                    onChange={handleChange}
                  />
                  <Label>Nombre: </Label>
                  <br />
                  {nameError && (
                    <Span>{nameError}</Span>
                  )}
                </InputContainer>

                <InputContainer>
                  <Input
                    type="text"
                    name={"lastName"}
                    value={lastName}
                    placeholder='a'
                    onChange={handleChange}
                  />
                  <Label>Apellidos: </Label>
                  <br />
                  {lastNameError && (
                    <Span>{lastNameError}</Span>
                  )}
                </InputContainer>

                <InputContainer>
                  <Input
                    type="text"
                    name={"email"}
                    placeholder='a'
                    value={email}
                    onChange={handleChange}
                  />
                  <Label>Correo electrónico: </Label>
                  <br />
                  {emailError && (
                    <Span>{emailError}</Span>
                  )}
                </InputContainer>

                <InputContainer>
                  <Input
                    type="password"
                    name={"password"}
                    placeholder='a'
                    value={password}
                    onChange={handleChange}
                  />
                  <Label>Contraseña: </Label>
                  <br />
                  {passwordError && (
                    <Span>{passwordError}</Span>
                  )}
                </InputContainer>

                <InputContainer>
                  <Input
                    type="password"
                    name={"repeatPassword"}
                    placeholder='a'
                    value={repeatPassword}
                    onChange={handleChange}
                  />
                  <Label>Repetr contraseña: </Label>
                  <br />
                  {repeatPasswordError && (
                    <Span>{repeatPasswordError}</Span>
                  )}
                </InputContainer>
              </GrupoInput>

            <GrupoCheck>
            <CheckContainer>
              <LabelCheck>Activo </LabelCheck>
              <InputCheck
                type="checkbox"
                name={"isActive"}
                checked={isActive === 1}
                onChange={handleCheckboxChange}
              />
             {/*  <br /> */}
            </CheckContainer>
            </GrupoCheck>
          </ContainerScroll>

            <ButtonContainer>
              <SubmitBtn>Guardar</SubmitBtn>
              <SubmitBtn onClick={() => setModalIsOpen(false)}>Cancelar</SubmitBtn>
            </ButtonContainer>

          </FormEdit>
        </ContainerModal>
        <button onClick={() => handleDelete(id)}>
          <Img
            src={deleteIcon}
            alt="Delete"
          />
        </button>
      </td>
    </>
  );
}
