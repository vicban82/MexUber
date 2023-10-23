import { useEffect, useState } from "react";
import editIcon from "../../../assets/img/editIcon.png";
import deleteIcon from "../../../assets/img/deleteIcon.png";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { headers } from "../../../tools/accessToken";
import { deleteAlert } from "../../../tools/driverAlerts/delete";
import { errorUpDate, successUpDate } from "../../../tools/adminAlerts/upDate";
import { useDropzone } from "react-dropzone";
import { axiosPutDriver } from "../../../hooks/drivers/crudDrivers";
import styled from 'styled-components';
// import { props } from "./props";
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
  SelectContainer,
  Select,
  GrupoInput,
  GrupoSelect,
  GrupoImg,
  SubeImgContainer,
  TituloSeccion,
  ImgSube,
  SubeContainerImg,
  Span,
 } from "../../../components/reusable/FormularioModalDriver";

Modal.setAppElement("#root");

const dropzoneContainerStyles = {
  width: '200px', // Establece el ancho del contenedor
  height: '200px', // Establece la altura del contenedor
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
};

const Img = styled.img`
  height: 32px;
`;

export function ButtonsTable({ id, tDriver, setTDriver, driver, setDriver, errorForm, setErrorForm, }) {

  // useEffect(() => {
  //   // Actualiza el estado del driver cuando se cambia el ID para que coincida con el objeto correspondiente en tDriver
  //   const currentDriver = tDriver.find(item => item._id === id);
  //   const update = {
  //     name: currentDriver.name,
  //     lastName: currentDriver.lastName,
  //     zipCode: currentDriver.zipCode,
  //     state: currentDriver.state,
  //     city: currentDriver.city,
  //     colonia: currentDriver.colonia,
  //     address: currentDriver.address,
  //     contact: currentDriver.contact,
  //     email: currentDriver.email,
  //     driverPicture: currentDriver.driverPicture,
  //     driverLicenseNumber: currentDriver.driverLicenseNumber,
  //     dateLicense: currentDriver.dateLicense,
  //     stateLicense: currentDriver.stateLicense,
  //     typeLicense: currentDriver.typeLicense,
  //     frontLicensePicture: currentDriver.frontLicensePicture,
  //     backLicensePicture: currentDriver.backLicensePicture,
  //     password: "",
  //     repeatPassword: "",
  //     isActive: 0 || 1,
  //     messageReasonInActive: "",
  //     services: 0 || 1,
  //   }
  //   if (update) {
  //     setDriver(update);
  //   }
  // }, [id, tDriver]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDelete = async (id) => {
    const deleteDriver = tDriver.find(el => el._id === id)
    deleteAlert(deleteDriver, id, tDriver, setTDriver)
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Manejar cambios para checkbox y convertir 1 (true) o 0 (false)
    const newValue = type === "checkbox" ? !driver[name] : value;

    setDriver({
      ...driver,
      [name]: newValue,
    });
    setErrorForm(
      validateAdmin({
        ...driver,
        [name]: newValue,
      })
    )
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpg', '.png'],
    },
  });

  const {
    name,
    lastName,
    zipCode, // CODIGO POSTAL
    state, // ESTADO DE MEXICO
    city,
    colonia,
    address,
    contact, // NUMERO DE CONTACTO DEL CONDUCTOR
    email,
    driverPicture, //* FOTO DEL CONDUCTOR
    driverLicenseNumber, //* NUMERO LICENCIA DEL CONDUCTOR
    dateLicense, // FECHA - VIGENCIA DE LA LICENCIA
    stateLicense, // ESTADO DE LA LICENCIA
    typeLicense, // TIPO LICENCIA
    frontLicensePicture, //* FOTO FRONTAL DE LA LICENCIA
    backLicensePicture, //* FOTO REVERSO DE LA LICENCIA
    password,
    repeatPassword,
    isActive,
    messageReasonInActive, // MENSAJE RASON INACTIVO
    services, // TODOS - LGBQT+ - MUJERES
  } = driver;
  
  const {
    nameError,
    lastNameError,
    zipCodeError,
    stateError,
    cityError,
    coloniaError,
    addressError,
    contactError,
    emailError,
    driverPictureError,
    driverLicenseNumberError,
    dateLicenseError,
    stateLicenseError,
    typeLicenseError,
    frontLicensePictureError,
    backLicensePictureError,
    passwordError,
    repeatPasswordError,
    isActiveError,
    messageReasonInActiveError,
    servicesError,
  } = errorForm;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !lastName || !email) {
      errorUpDate(driver, errorForm);
    } else if (nameError || lastNameError || emailError) {
      errorUpDate(driver, errorForm);
    } else {
      try {
        successUpDate(driver);
        // Envia la solicitud de actualización al backend
        const currentDriver = await axiosPutDriver(id, driver, headers);
        
        // Actualiza la lista en el frontend
        setTDriver(prev => {
          // Reemplaza el driver editado en la lista por el nuevo driver devuelto por el backend
          const updatedTDriver = prev.map(item => (item._id === id ? currentDriver : item));
          return updatedTDriver;
        });
  
        // Cierra el modal después de guardar
        setModalIsOpen(false);
      } catch (error) {
        console.error("Error al guardar el driver:", error);
      }
    }
  }
  
  return (
  <>
    <td>
      {/* The button to open modal */}
      <button onClick={openModal}>
        <Img src={editIcon} alt="Edición" />
      </button>

      {/* Modal */}
      <ContainerModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <FormEdit onSubmit={handleSubmit}>
        <FormHead><h2>Nuevo Conductor</h2></FormHead>
        <br />
        <ContainerScroll>
          {/*//* INFORMACION DEL CONDUCTOR */}
        <TituloSeccion>Datos Personales<hr /></TituloSeccion>
        <GrupoInput>
          <InputContainer>
            <Input
              type="text"
              name={"name"}
              value={name}
              placeholder="a"
              onChange={handleChange}
            />
            {/* <Label>{props.name}: </Label> */}
            <br />
            {nameError && (
              <Span>{nameError}</Span>
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
            {/* <Label>{props.lastName}: </Label> */}
            <br />
            {lastNameError && (
              <Span>{lastNameError}</Span>
            )}
          </InputContainer>

          <InputContainer>
            <Input
              type="text"
              name={"zipCode"}
              placeholder="a"
              value={zipCode}
              onChange={handleChange}
            />
            {/* <Label>{props.zipCode}: </Label> */}
            <br />
            {zipCodeError && (
              <Span>{zipCodeError}</Span>
            )}
          </InputContainer>
          </GrupoInput>
        
        </ContainerScroll>
          <ButtonContainer>
            <SubmitBtn type="submit">Guardar</SubmitBtn>
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
