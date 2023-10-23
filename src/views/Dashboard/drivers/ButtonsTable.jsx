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
  SelectContainer,
  Select,
  GrupoInput,
  GrupoSelect,
  GrupoImg,
  SubeImgContainer,
  TituloSeccion,
  SpanData,
  ImgSube,
  SubeContainerImg,
  GrupoCheck,
  CheckContainer,
  Textarea,
  TextareaContainer
 } from "../../../components/reusable/FormularioModal";

Modal.setAppElement("#root");

const dropzoneContainerStyles = {
  width: '50%', // Establece el ancho del contenedor
  //height: '200px', // Establece la altura del contenedor
  border: '2px dashed #700202',
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
      <ContainerModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar elemento"
      >
        <FormEdit onSubmit={handleSubmit}>
        <FormHead><h2>Editar Conductor</h2></FormHead>
          <br />
          <ContainerScroll>
          <TituloSeccion>Datos Personales<hr /></TituloSeccion>
          {
            Object.keys(driver).map((el, idx) => {
              //console.log("EL:", el, ",IDX:", idx)
              for (const esp in props) {
                if (el === esp) {
                  if (idx === 3 || idx === 4 || idx === 5 || idx === 11 || idx === 12 || idx === 20) {
                    // SELECT = ESTADO 3, CIUDAD 4, COLONIA 5, ESTADO LICENCIA 11, TIPO LICENCIA 12
                    // MOTIVO DE BLOQUEO = 20
                    if (idx === 20) {
                      return (
                        <GrupoInput>
                        <InputContainer key={idx}>
                          <Input type="text" disabled={false} placeholder="a"/>
                          <Label>{props[esp]}: </Label>
                        </InputContainer>
                        </GrupoInput>
                      );
                    }
                    return (
                      <GrupoSelect>
                      <SelectContainer key={idx}>
                        {/* <label htmlFor={`Input-${el}`}>{props[esp]}: </label> */}
                        <Select disabled={true} >
                          <option>
                            Selecciona
                          </option>
                          <option>
                            dfsdf
                          </option>
                          {/* {listSepomex} */}
                        </Select>
                      </SelectContainer>
                      </GrupoSelect>
                    );
                  } else if (idx === 9 || idx === 14 || idx === 15) {
                    // DROP = FOTO CONDUCTOR 9, FOTO LICENCIA 14 - 15
                    
                    if (idx === 9) {
                      return (
                        <GrupoImg>
                        <SubeImgContainer key={idx}>
                          <div {...getRootProps()} style={dropzoneContainerStyles}>
                            <input {...getInputProps()}/>
                          <p>Frente</p>
                          <Label>{props[esp]}: </Label>
                          </div>
                        </SubeImgContainer> 
                        </GrupoImg>
                      );
                    }
                    return (
                      
                        <SubeImgContainer key={idx} >
                          <SubeContainerImg {...getRootProps()} style={dropzoneContainerStyles}>
                            <ImgSube {...getInputProps()} placeholder="a" />
                          <p>Licencia</p>
                          {/* <Label>{props[esp]}: </Label> */}
                          </SubeContainerImg>
                        </SubeImgContainer>
                    );




                  } else if (idx === 13) {
                    // DATE-FECHA = VIGENCIA DE LA LICENCIA 13
                    return (
                      <InputContainer key={idx}>
                        <Input type="date" placeholder="a"/>
                        <Label htmlFor={`Input-${el}`}>{props[esp]}: </Label>
                      </InputContainer>
                    );
                  } else if (idx === 16 || idx === 19) {
                    // CHECKBOX = SERVICIOS(TODOS - MUJERES - LGBT) 16, ACTIVO 19
                    if (idx === 19) {
                      return (
                        <GrupoCheck key={idx}>
                          <LabelCheck htmlFor={`Input-${el}`}>{props[esp]}: </LabelCheck>
                          <InputCheck
                            id={`Input-${el}`}
                            name={el}
                            checked={driver[el]}
                            onChange={handleChange}
                            placeholder="a"
                            type="checkbox"
                            value={driver[el] ? 1 : 0}
                          />
                        </GrupoCheck>
                      );
                    }
                    return (
                      <GrupoCheck key={idx}>
                        <LabelCheck>{props[esp]}: </LabelCheck>
                        <InputCheck 
                          type="checkbox"
                          checked={driver[el]} 
                          onChange={handleChange} 
                        />TODOS
                        <InputCheck type="checkbox" />LGBTQ+
                        <InputCheck type="checkbox" />MUJERES
                      </GrupoCheck>
                    );
                  } else if (idx === 17 || idx === 18) {
                    // PASSWORD = 17 - 18
                    return (
                      <InputContainer key={idx}>
                        <Input type="password" placeholder="a"/>
                        <Label htmlFor={`Input-${el}`}>{props[esp]}: </Label>
                      </InputContainer>
                    );
                  } else {
                    return (
                      <InputContainer key={idx}>
                        <Input type="text" placeholder="a"/>
                        <Label htmlFor={`input-${el}`}>{props[esp]}: </Label>
                      </InputContainer>
                    );
                  }

                }
              }
            })
          }
          </ContainerScroll>
          <ButtonContainer>
            <SubmitBtn onClick={closeModal}>Cancelar</SubmitBtn>
            <SubmitBtn>Guardar</SubmitBtn>
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
