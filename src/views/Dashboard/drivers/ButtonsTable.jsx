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
Modal.setAppElement("#root");

const StyledTd = styled.td`
  display: flex;
`;

const dropzoneContainerStyles = {
  width: '200px', // Establece el ancho del contenedor
  height: '200px', // Establece la altura del contenedor
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
};

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
    <StyledTd>
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
            Object.keys(driver).map((el, idx) => {
              // console.log("EL:", el, ",IDX:", idx)
              for (const esp in props) {
                if (el === esp) {
                  if (idx === 3 || idx === 4 || idx === 5 || idx === 11 || idx === 12 || idx === 20) {
                    // SELECT = ESTADO 3, CIUDAD 4, COLONIA 5, ESTADO LICENCIA 11, TIPO LICENCIA 12
                    // MOTIVO DE BLOQUEO = 20
                    if (idx === 20) {
                      return (
                        <div key={idx}>
                          <label>{props[esp]}: </label>
                          <input type="text" disabled={true} />
                        </div>
                      );
                    }
                    return (
                      <div key={idx}>
                        <label htmlFor={`input-${el}`}>{props[esp]}: </label>
                        <select disabled={true} >
                          <option>
                            Selecciona
                          </option>
                          {/* {listSepomex} */}
                        </select>
                      </div>
                    );
                  } else if (idx === 9 || idx === 14 || idx === 15) {
                    // DROP = FOTO CONDUCTOR 9, FOTO LICENCIA 14 - 15
                    if (idx === 9) {
                      return (
                        <div key={idx}>
                          <label>{props[esp]}: </label>
                          <div {...getRootProps()} style={dropzoneContainerStyles}>
                            <input {...getInputProps()} />
                          </div>
                          <p>Frente</p>
                        </div>
                      );
                    }
                    return (
                      <div key={idx} >
                        <label>{props[esp]}: </label>
                        <div {...getRootProps()} style={dropzoneContainerStyles}>
                          <input {...getInputProps()} />
                        </div>
                        <p>Licencia</p>
                      </div>
                    );
                  } else if (idx === 13) {
                    // DATE-FECHA = VIGENCIA DE LA LICENCIA 13
                    return (
                      <div key={idx}>
                        <label htmlFor={`input-${el}`}>{props[esp]}: </label>
                        <input type="date" />
                      </div>
                    );
                  } else if (idx === 16 || idx === 19) {
                    // CHECKBOX = SERVICIOS(TODOS - MUJERES - LGBT) 16, ACTIVO 19
                    if (idx === 19) {
                      return (
                        <div key={idx}>
                          <label htmlFor={`input-${el}`}>{props[esp]}: </label>
                          <input
                            id={`input-${el}`}
                            name={el}
                            checked={driver[el]}
                            onChange={handleChange}
                            type="checkbox"
                            value={driver[el] ? 1 : 0}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={idx}>
                        <label>{props[esp]}: </label>
                        <input 
                          type="checkbox"
                          checked={driver[el]} 
                          onChange={handleChange} 
                        />TODOS
                        <input type="checkbox" />LGBTQ+
                        <input type="checkbox" />MUJERES
                      </div>
                    );
                  } else if (idx === 17 || idx === 18) {
                    // PASSWORD = 17 - 18
                    return (
                      <div key={idx}>
                        <label htmlFor={`input-${el}`}>{props[esp]}: </label>
                        <input type="password" />
                      </div>
                    );
                  } else {
                    return (
                      <div key={idx}>
                        <label htmlFor={`input-${el}`}>{props[esp]}: </label>
                        <input type="text" />
                      </div>
                    );
                  }

                }
              }
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
    </StyledTd>
  );
}