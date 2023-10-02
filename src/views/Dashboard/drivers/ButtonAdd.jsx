import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { validateAdmin } from "../../../validations/admins";
import { headers } from "../../../tools/accessToken";
import { axiosPostDriver } from "../../../hooks/drivers/crudDrivers";
import { errorRegister, successRegister } from "../../../tools/driverAlerts/register";
import { axiosGetSepomex } from "../../../hooks/db/info";
import { useDropzone } from 'react-dropzone';
import { props } from "./props";
Modal.setAppElement("#root"); // Reemplaza '#root' con el ID de tu elemento raíz de la aplicación

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

export const ButtonAdd = ({ tDriver, setTDriver, driver, setDriver, errorForm, setErrorForm }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sepomex, setSepomex] = useState([]);
  
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
    tokenNotification, //? OPCIONAL
    typePhone, //? OPCIONAL iOS || Android
    services, // TODOS - LGBQT+ - MUJERES
    car,
  } = driver;

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

  useEffect(() => {
    axiosGetSepomex(setSepomex);
  }, []);

  // const listSepomex = sepomex.map(el => {
  //   return (
  //     <option key={el._id} >
  //       {el.neighborhood}
  //     </option>
  //   );
  // });
  // console.log("listSepomex:", listSepomex)
  // const onDrop = useCallback((acceptedFiles) => {
  //   // Aquí puedes manejar los archivos aceptados, como enviarlos al servidor.
  //   console.log(acceptedFiles);
  // }, []);

  const { getRootProps, getInputProps } = useDropzone({
    // onDrop,
    accept: {
      'image/*': ['.jpg', '.png'],
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !name ||
      !lastName ||
      !zipCode ||
      !state ||
      !city ||
      !colonia ||
      !address ||
      !contact ||
      !email ||
      !driverPicture ||
      !driverLicenseNumber ||
      !dateLicense ||
      !stateLicense ||
      !typeLicense ||
      !frontLicensePicture ||
      !backLicensePicture ||
      !password ||
      !repeatPassword ||
      !isActive ||
      !messageReasonInActive ||
      !services
    ) {
      errorRegister(driver, errorForm);
    } else if (
      nameError ||
      lastNameError ||
      zipCodeError ||
      stateError ||
      cityError ||
      coloniaError ||
      addressError ||
      contactError ||
      emailError ||
      driverPictureError ||
      driverLicenseNumberError ||
      dateLicenseError ||
      stateLicenseError ||
      typeLicenseError ||
      frontLicensePictureError ||
      backLicensePictureError ||
      passwordError ||
      repeatPasswordError ||
      isActiveError ||
      messageReasonInActiveError ||
      servicesError
    ) {
      errorRegister(driver, errorForm);
    } else {
      try {
        successRegister(driver);
        const newDriver = await axiosPostDriver(driver, headers);
        setTDriver([...tDriver, newDriver]);
    
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
          {Object.keys(driver).map((el, idx) => {
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
                        name={el}
                        type="checkbox"
                        checked={driver[el]} 
                        onChange={handleChange}
                        value={driver[el] ? 1 : 0} 
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
